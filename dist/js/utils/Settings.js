"use strict";
const Config = require('electron-config');
const config = new Config();
class Settings {
    static setVisted(url) {
        this.incrementVisit(url);
        this.addToHistory(url);
    }
    //Increment our visit counter
    static incrementVisit(url) {
        let formatUrl = url.replace(".", "");
        let key = "VisitNumbers." + formatUrl;
        if (config.has(key)) {
            let visitNo = config.get(key);
            visitNo++;
            config.set(key, visitNo);
        }
        else {
            config.set(key, 1);
        }
    }
    //Add a url to our history
    static addToHistory(url) {
        if (config.has("History")) {
            let history = config.get("History");
            history.push(url);
            config.set("History");
        }
        else {
            config.set("History", [url]);
        }
    }
    //Get any value form the config
    static getValue(key) {
        if (config.has(key)) {
            return config.get(key);
        }
        else {
            return "Key does not exist";
        }
    }
}
exports.Settings = Settings;
