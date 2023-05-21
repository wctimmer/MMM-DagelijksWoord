/* Magic Mirror
 * Node Module: MMM-DagelijksWoord
 *
 * By Wim Timmer
 * Based on MMM-DailyBibleVerse
 * MIT Licensed.
 */

Module.register("MMM-DagelijksWoord", {
    // Default module config.
    result: [],
    defaults: {
        translation: 'nbg21'
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this;
        
        // empty text on start
        this.verse = "";
        this.source = "";
        this.donationText = "";

        //Do this once first
        self.sendSocketNotification('START', this.config);

        //Then every 4 hour (change only once per day)
        setInterval(function() {
                self.sendSocketNotification('START', this.config);
        }, 3600000*4); //perform every 4 hour (3600000 milliseconds in a hour)
    },

    getStyles: function () {
        return ["MMM-DagelijksWoord.css"];
    },

    // Override dom generator.
    getDom: function() {
        Log.log("Updating MMM-DagelijksWoord DOM.");

        var wrapper = document.createElement("div");
        var wrapperVerse = document.createElement("div");
		var labelSource = document.createElement("label");
        
        wrapperVerse.innerHTML = this.verse;
        wrapperVerse.classList.add(this.name+"-verse");
        labelSource.innerHTML = this.source;
		labelSource.classList.add(this.name+"-source");	
		
        wrapper.appendChild(labelSource);
        wrapper.appendChild(wrapperVerse);
        
        //show donation text on donation request day
        if (this.donationDay()) { // only on donation request day (monday after christmas)
            var wrapperDonation = document.createElement("div");
            wrapperDonation.innerHTML = this.donationText;
		    wrapperDonation.classList.add(this.name+"-donation");
            wrapper.appendChild(wrapperDonation);
            }
        return wrapper;
        },

    socketNotificationReceived: function(notification, payload) {
        Log.log("socket received from Node Helper");
        if(notification == "DAGELIJKS_WOORD_RESULT"){
            var json = payload;
            Log.log(payload);
            this.verse = json.verse;
            this.source = json.source;
            this.donationText = json.donationText
            this.updateDom();
        }
    },
    
    donationDay: function() {
        const date = new Date();
        if (date.getMonth() == 11 && date.getDate() == 27 && date.getDay != 0) return true; //day after chrismass and not on a sunday.
        else if (date.getMonth() == 11 && date.getDate() == 28 && date.getDay == 1) return true; //day after chrismass when second chrismass day is a sunday.
        else return false;
    }
});
