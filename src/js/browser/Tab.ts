/// <reference path="../github-electron.d.ts" />

export class Tab {

    index : number;
    view : Electron.WebViewElement;
    tab : HTMLElement;
    favicon: HTMLImageElement;
    close : Element;

  constructor(index: number){
    this.index = index;
    this.view = <Electron.WebViewElement> document.createElement('webview');
    this.view.src = "http://github.com";
    this.view.className = "webView";
    document.body.appendChild(this.view);

    this.tab = document.createElement('div');
    this.tab.className = "tab";
    this.tab.innerHTML = '<img class="favicon" src="" /><span class="title"></span><img class="close" src="imgs/close.svg" />';
    var newTab = document.getElementById("newTab")
    newTab.parentNode.insertBefore(this.tab, newTab);
    this.favicon = <HTMLImageElement> this.tab.querySelector(".favicon");
    this.close = this.tab.querySelector(".close");
    //document.getElementById("tabs").appendChild(this.tab);

    this.view.addEventListener('did-finish-load', (e) =>{
      this.tab.querySelector(".title").innerHTML = this.view.getTitle();
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
