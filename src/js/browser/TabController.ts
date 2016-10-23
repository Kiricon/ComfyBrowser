/// <reference path="../github-electron.d.ts" />
import {Tab} from "./Tab";
import {Window} from "./WindowController";
import {Sorter} from "./Sorter";

export class TabController {

  Tabs : Array<Tab> = new Array<Tab>();
  TabIndex : number = 0;
  NewTab : HTMLElement = document.getElementById('newTab');
  Window : Window;
  //Sorter : Sorter = new Sorter(<HTMLElement>document.getElementsByClassName('chrome-tabs')[0]);

  constructor(){
    this.CreateTab();
    this.Listen();
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
    let t : Tab = new Tab(this.TabIndex);

    t.tab.addEventListener('click', ()=> {
      this.TabIndex = this.Tabs.indexOf(t);
      this.ShowTab();
      this.Window.Refresh(this.Current());
    });

    t.tab.addEventListener('mousemove', (e)=>{
      if (e.which == 1){
        if(t.point == 0){
          t.point = e.pageX;
        }
        event.preventDefault()
        t.tempOffset = e.pageX - t.point;
        t.tab.style.marginLeft = t.tempOffset+t.offset+"px";

      }else{
        if(t.point != 0){
          t.offset = t.tempOffset;
        }
        t.point = 0;
      }
    });


    t.close.addEventListener('click', () => {
      t.delete();
      let index = this.Tabs.indexOf(t);
      this.Tabs.splice(index, 1);
      this.TabIndex = 0;
      this.ShowTab();
    });

    this.Tabs.push(t);
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
