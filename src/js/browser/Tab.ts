/// <reference path="../github-electron.d.ts" />

export class Tab {

    index : number;
    view : Electron.WebViewElement;
    tab : HTMLElement;
    favicon: HTMLImageElement;
    loader : HTMLElement;
    close : Element;

  constructor(index: number){
    this.index = index;
    this.view = <Electron.WebViewElement> document.createElement('webview');
    this.view.src = "http://github.com";
    this.view.className = "webView";
    document.body.appendChild(this.view);

    this.tab = document.createElement('div');
    this.tab.className = "tab";
    this.tab.innerHTML = '<img class="favicon" src="" />';
    this.tab.innerHTML += '<svg class="spinner" style="display:none;" width="15px" height="15px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>';
    this.tab.innerHTML += '<span class="title"></span><img class="close" src="imgs/close.svg" />';

    var newTab = document.getElementById("newTab")
    newTab.parentNode.insertBefore(this.tab, newTab);

    this.favicon = <HTMLImageElement> this.tab.querySelector(".favicon");
    this.close = this.tab.querySelector(".close");
    this.loader = <HTMLImageElement> this.tab.querySelector(".spinner");
    //document.getElementById("tabs").appendChild(this.tab);

    this.view.addEventListener('did-start-loading', (e) =>{
      this.loader.style.display = "block";
      this.favicon.style.display = "none";
    });

    this.view.addEventListener('did-stop-loading', (e) =>{
      this.tab.querySelector(".title").innerHTML = this.view.getTitle();
      this.loader.style.display = "none";
      this.favicon.style.display = "block";
    });

    this.view.addEventListener('page-favicon-updated', (e)=>{
      this.favicon.src = e.favicons[0];
    });

  }


  show():void{
    this.view.style.display = "inline-flex";
    this.tab.style.border = "solid 1px green";
  }

  hide():void{
    this.view.style.display = "none";
    this.tab.style.border = "solid 1px black";
  }

  delete():void{
    this.tab.remove();
    this.view.remove();
  }

}
