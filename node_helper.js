/* Magic Mirror
 * Node Helper: MMM-DagelijksWoord
 *
 * By Wim Timmer
 * Based on MMM-DailyBibleVerse
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
        console.log("Started node_helper.js for MMM-DagelijksWoord.");
        
	},

	socketNotificationReceived: function(notification, config) {
		var self = this;
		var url = 'https://' + config.username + ':' + config.password + '@feed.dagelijkswoord.nl/api/json/1.0/';
		request({ url: url, method: 'GET' }, function(error, response, body) {			
			if(!error && response.statusCode == 200){;
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
			}
		});	
	},
});
