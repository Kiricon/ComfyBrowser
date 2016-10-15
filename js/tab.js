class Tab {
  constructor(index){
    this.index = index;
    this.view = document.createElement('webview');
    this.view.src = "http://github.com";
    this.view.className = "webView";
    document.body.appendChild(this.view);

    this.tab = document.createElement('div');
    this.tab.className = "tab";
    document.getElementById("tabs").appendChild(this.tab);

    this.view.addEventListener('did-finish-load', (e) =>{
      this.tab.innerHTML = this.view.getTitle();
    });
    this.listen();
  }

  listen(){

    this.tab.addEventListener('click', ()=> {
      tabs.forEach(function(value){
        value.hide();
      });
      this.show();
    });

  }

  show(){
    this.view.style.display = "inline-flex";
    this.tab.style.border = "solid 1px green";
  }

  hide(){
    this.view.style.display = "none";
    this.tab.style.border = "solid 1px black";
  }
}
