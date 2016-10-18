"use strict";
/// <reference path="../github-electron.d.ts" />
const electron_1 = require("electron");
class Window {
    constructor(tabs) {
        //Set all our button up
        this.BackButton = document.getElementById('back');
        this.ForwardButton = document.getElementById('forward');
        this.MinButton = document.getElementById("min-btn");
        this.MaxButton = document.getElementById("max-btn");
        this.CloseButton = document.getElementById("close-btn");
        this.RefreshButton = document.getElementById("refresh");
        this.SearchBar = document.getElementById('searchBar');
        this.tabController = tabs;
        this.Listen();
    }
    // Listen for window controls such as close, minimize or maximize
    Listen() {
        this.MinButton.addEventListener("click", function (e) {
            let window = electron_1.remote.getCurrentWindow();
            window.minimize();
        });
        this.MaxButton.addEventListener("click", function (e) {
            let window = electron_1.remote.getCurrentWindow();
            if (!window.isMaximized()) {
                window.maximize();
            }
            else {
                window.unmaximize();
            }
        });
        this.CloseButton.addEventListener("click", function (e) {
            let window = electron_1.remote.getCurrentWindow();
            window.close();
        });
        let self = this;
        //Listen for our control+S
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                self.SearchBar.style.display = "block";
                self.SearchBar.focus();
            }
        }, false);
        //Listen for our enter
        this.SearchBar.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                self.tabController.CurrentWebView().src = self.Url(self.SearchBar.value);
                self.SearchBar.value = "";
                self.SearchBar.style.display = "none";
            }
        });
        this.RefreshButton.addEventListener('click', () => {
            self.tabController.CurrentWebView().reload();
        });
        this.BackButton.addEventListener('click', () => {
            self.tabController.CurrentWebView().goBack();
        });
        this.ForwardButton.addEventListener('click', () => {
            self.tabController.CurrentWebView().goForward();
        });
    }
    //Refresh the window elements
    Refresh(tab) {
        if (tab.view.canGoBack()) {
            this.BackButton.style.opacity = "1";
        }
        else {
            this.BackButton.style.opacity = "0.4";
        }
        if (tab.view.canGoForward()) {
            this.ForwardButton.style.opacity = "1";
        }
        else {
            this.ForwardButton.style.opacity = "0.4";
        }
    }
    //Returns properly formatted url or google search relavent.
    Url(input) {
        var url = input;
        if (!input.includes("http://") && !input.includes("https://")) {
            url = "http://" + input;
        }
        if (input.includes(" ") || !input.includes(".")) {
            var arr = input.split(" ");
            url = "https://www.google.com/#safe=off&q=";
            arr.forEach(function (value) {
                url += "+" + value;
            });
        }
        return url;
    }
}
exports.Window = Window;
