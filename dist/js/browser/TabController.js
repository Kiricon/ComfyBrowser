"use strict";
/// <reference path="../github-electron.d.ts" />
const Tab_1 = require("./Tab");
class TabController {
    constructor() {
        this.Tabs = new Array();
        this.TabIndex = 0;
        this.NewTab = document.getElementById('newTab');
        this.CreateTab();
        this.Listen();
    }
    // Listen for things to happen
    Listen() {
        this.NewTab.addEventListener('click', () => {
            this.CreateTab();
        });
    }
    //Create a new tab for us and do all the work
    CreateTab() {
        this.TabIndex = this.Tabs.length;
        let t = new Tab_1.Tab(this.TabIndex);
        t.tab.addEventListener('click', () => {
            this.TabIndex = t.index;
            this.ShowTab();
            this.Window.Refresh(this.Current());
        });
        this.Tabs.push(t);
        this.ShowTab();
    }
    //Show the current index Tab
    ShowTab() {
        this.Tabs.forEach(function (value) {
            value.hide();
        });
        this.Tabs[this.TabIndex].show();
    }
    CurrentWebView() {
        return this.Tabs[this.TabIndex].view;
    }
    CurrentTab() {
        return this.Tabs[this.TabIndex].tab;
    }
    Current() {
        return this.Tabs[this.TabIndex];
    }
}
exports.TabController = TabController;
