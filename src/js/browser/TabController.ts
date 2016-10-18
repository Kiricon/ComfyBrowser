/// <reference path="../github-electron.d.ts" />
import {Tab} from "./Tab";
import {Window} from "./WindowController";

export class TabController {

  Tabs : Array<Tab> = new Array<Tab>();
  TabIndex : number = 0;
  NewTab : HTMLElement = document.getElementById('newTab');
  Window : Window;

  constructor(){
    this.CreateTab();
  }

  // Listen for things to happen
  Listen():void {
    this.NewTab.addEventListener('click', ()=>{
      this.CreateTab();
    });
  }

  //Create a new tab for us and do all the work
  CreateTab():void{
    this.TabIndex = this.Tabs.length;
    let tab : Tab = new Tab(this.TabIndex);

    tab.tab.addEventListener('click', ()=> {
      this.TabIndex = tab.index;
      this.ShowTab();
      this.Window.Refresh(this.Current());
    });

    this.Tabs.push(new Tab(0));
    this.ShowTab();

  }

  //Show the current index Tab
  ShowTab():void {
    this.Tabs.forEach(function(value){
      value.hide();
    });
    this.Tabs[this.TabIndex].show();
  }

  CurrentWebView():Electron.WebViewElement {
    return this.Tabs[this.TabIndex].view
  }

  CurrentTab():HTMLElement{
    return this.Tabs[this.TabIndex].tab;
  }

  Current():Tab {
    return this.Tabs[this.TabIndex];
  }



}
