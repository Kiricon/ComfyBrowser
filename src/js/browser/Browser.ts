import {TabController} from "./TabController";
import {Window} from "./WindowController";

export class Browser {

  tabController : TabController;
  window : Window;

  constructor(){
    this.tabController = new TabController();
    this.window = new Window(this.tabController);
    this.tabController.Window = this.window;
  }

}
