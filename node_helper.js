/* Magic Mirror
 * Node Helper: MMM-DagelijksWoord
 *
 * By Wim Timmer
 * Based on MMM-DailyBibleVerse
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const https = require('https');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
        console.log("Started node_helper.js for MMM-DagelijksWoord.");
        
	},

	socketNotificationReceived: function(notification, config) {
		var self = this;
        var options = {
           host: 'feed.dagelijkswoord.nl',
           port: 443,
           path: '/api/json/1.0/',
           // authentication headers
           headers: {
              'Authorization': 'Basic ' + new Buffer.from(config.username + ':' + config.password).toString('base64')
           }   
        };
        
        https.get(options, function(resp){

            let body = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                body += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                var data = JSON.parse(body);
                var result = {}; // create empty result
                
                // select right translation                               
                var verses = data.data[0].text;
                result.verse = null;
                for(key in verses)
                {
                    if (key === config.translation.toLowerCase()) {
                         result.verse = verses[key];
                    }
                }
                if (result.verse === null){
                    console.error("MMM-DagelijksWoord: Translation not correct configured!");
                }
                    
                result.source = data.data[0].source;
                result.donationText = data.in_app_use.app_text;
                console.log("MMM-DagelijksWoord: "+ result.source + ': ' + result.verse);
                
                
				self.sendSocketNotification('DAGELIJKS_WOORD_RESULT', result);
            });

       }).on("error", (err) => {
           console.log("Error: " + err.message);
       });
  
	},
});
