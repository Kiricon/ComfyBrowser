"use strict";
const TabController_1 = require("./TabController");
const WindowController_1 = require("./WindowController");
class Browser {
    constructor() {
        this.tabController = new TabController_1.TabController();
        this.window = new WindowController_1.Window(this.tabController);
        this.tabController.Window = this.window;
    }
}
exports.Browser = Browser;
