/// <reference path="../github-electron.d.ts" />
import {remote as remote} from "electron";
import {Tab} from "./Tab";
import {TabController} from "./TabController";

export class Window {

  //Set all our button up
  BackButton : HTMLElement = document.getElementById('back');
  ForwardButton : HTMLElement = document.getElementById('forward');
  MinButton : HTMLElement = document.getElementById("min-btn");
  MaxButton : HTMLElement = document.getElementById("max-btn");
  CloseButton : HTMLElement = document.getElementById("close-btn");
  RefreshButton : HTMLElement = document.getElementById("refresh");
  SearchBar : HTMLInputElement = <HTMLInputElement> document.getElementById('searchBar');
  tabController : TabController;

  constructor(tabs :TabController){
    this.tabController = tabs;
    this.Listen();
  }



  // Listen for window controls such as close, minimize or maximize
  Listen():void{

    this.MinButton.addEventListener("click", function (e) {
           let window = remote.getCurrentWindow();
           window.minimize();
    });

    this.MaxButton.addEventListener("click", function (e) {
         let window = remote.getCurrentWindow();
         if (!window.isMaximized()) {
             window.maximize();
         } else {
             window.unmaximize();
         }
    });

    this.CloseButton.addEventListener("click", function (e) {
         let window = remote.getCurrentWindow();
         window.close();
    });

    let self = this;
    //Listen for our control+S
    document.addEventListener("keydown", function(e) {
         if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
           e.preventDefault();
           self.SearchBar.style.display = "block";
           self.SearchBar.focus();
         }
    }, false);


    //Listen for our enter
    this.SearchBar.addEventListener('keypress', function(e){
      var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          self.tabController.CurrentWebView().src = self.Url(self.SearchBar.value);
          self.SearchBar.value = "";
          self.SearchBar.style.display = "none";
        }
    });

    this.RefreshButton.addEventListener('click', () =>{
      self.tabController.CurrentWebView().reload();
    });

    this.BackButton.addEventListener('click', () =>{
      self.tabController.CurrentWebView().goBack();
    });

    this.ForwardButton.addEventListener('click', () =>{
      self.tabController.CurrentWebView().goForward();
    });

  }

  //Refresh the window elements
  Refresh(tab: Tab):void {

    if(tab.view.canGoBack()){
      this.BackButton.style.opacity = "1";
    }else{
      this.BackButton.style.opacity = "0.4";
    }

    if(tab.view.canGoForward()){
      this.ForwardButton.style.opacity = "1";
    }else{
      this.ForwardButton.style.opacity = "0.4";
    }
  }

  //Returns properly formatted url or google search relavent.
  Url(input: string):string {
    var url = input;

    if(!input.includes("http://") && !input.includes("https://")){
      url = "http://"+input;
    }

    if(input.includes(" ") || !input.includes(".")){
      var arr = input.split(" ");
      url = "https://www.google.com/#safe=off&q=";
      arr.forEach(function(value){
        url += "+"+value;
      });
    }

    return url;
  }


}
