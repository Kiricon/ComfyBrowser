"use strict";
/// <reference path="../github-electron.d.ts" />
require('electron-context-menu');
class Tab {
    constructor(index) {
        this.point = 0;
        this.offset = 0;
        this.tempOffset = 0;
        this.index = index;
        this.view = document.createElement('webview');
        this.view.src = "http://github.com";
        this.view.className = "webView";
        document.body.appendChild(this.view);
        this.tab = document.createElement('div');
        this.tab.className = "chrome-tab";
        this.tab.innerHTML = '<div class="chrome-tab-background"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg"> <defs> <symbol id="topleft" viewBox="0 0 214 29"><path d="M14.3 0.1L214 0.1 214 29 0 29C0 29 12.2 2.6 13.2 1.1 14.3-0.4 14.3 0.1 14.3 0.1Z"/></symbol> <symbol id="topright" viewBox="0 0 214 29"><use xlink:href="#topleft"/></symbol> <clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath> </defs> <svg width="50%" height="100%" transfrom="scale(-1, 1)"><use xlink:href="#topleft" width="214" height="29" class="chrome-tab-background"/><use xlink:href="#topleft" width="214" height="29" class="chrome-tab-shadow"/></svg> <g transform="scale(-1, 1)"> <svg width="50%" height="100%" x="-100%" y="0"><use xlink:href="#topright" width="214" height="29" class="chrome-tab-background"/><use xlink:href="#topright" width="214" height="29" class="chrome-tab-shadow"/></svg> </g> </svg> </div><svg class="spinner" style="display:none;" width="15px" height="15px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg> <div class="chrome-tab-favicon" style="background-image: url(\'\')"></div> <div class="chrome-tab-title"></div> <div class="chrome-tab-close"></div>';
        //this.tab.innerHTML += '<svg class="spinner" style="display:none;" width="15px" height="15px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>';
        var newTab = document.getElementById("newTab");
        newTab.parentNode.insertBefore(this.tab, newTab);
        this.favicon = this.tab.querySelector(".chrome-tab-favicon");
        this.close = this.tab.querySelector(".chrome-tab-close");
        this.loader = this.tab.querySelector(".spinner");
        //document.getElementById("tabs").appendChild(this.tab);
        this.view.addEventListener('did-start-loading', (e) => {
            this.loader.style.display = "inline-block";
            this.favicon.style.display = "none";
        });
        this.view.addEventListener('did-stop-loading', (e) => {
            this.tab.querySelector(".chrome-tab-title").innerHTML = this.view.getTitle();
            this.loader.style.display = "none";
            this.favicon.style.display = "inline-block";
            this.contextMenu = require('electron-context-menu')({
                window: this.view,
                append: params => [{
                        label: 'Inspect',
                        click: this.view.openDevTools()
                    }]
            });
        });
        this.view.addEventListener('page-favicon-updated', (e) => {
            this.favicon.style.backgroundImage = "url('" + e.favicons[0] + "')";
        });
    }
    show() {
        this.view.style.display = "inline-flex";
        this.tab.className += " chrome-tab-current";
    }
    hide() {
        this.view.style.display = "none";
        this.tab.className = "chrome-tab";
    }
    delete() {
        this.tab.remove();
        this.view.remove();
    }
}
exports.Tab = Tab;
