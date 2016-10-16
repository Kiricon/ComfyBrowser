class Tab {
  constructor(index){
    this.index = index;
    this.view = document.createElement('webview');
    this.view.src = "http://github.com";
    this.view.className = "webView";
    document.body.appendChild(this.view);

    this.tab = document.createElement('div');
    this.tab.className = "tab";
    this.tab.innerHTML = '<img class="favicon" src="" /><span class="title"></span>';
    var newTab = document.getElementById("newTab")
    newTab.parentNode.insertBefore(this.tab, newTab);
    //document.getElementById("tabs").appendChild(this.tab);

    this.view.addEventListener('did-finish-load', (e) =>{
      this.tab.querySelector(".title").innerHTML = this.view.getTitle();
    });

    this.view.addEventListener('page-favicon-updated', (e)=>{
      console.log(e);
      this.tab.querySelector(".favicon").src = e.favicons[0];
    });

    this.listen();
  }

  listen(){

    this.tab.addEventListener('click', ()=> {
      tabIndex = this.index;
      tabs.forEach(function(value){
        value.hide();
      });
      this.show();
      this.refresh();
    });

    //Refresh, back and forward button
    this.view.addEventListener('load-commit', (e) =>{
      if(this.view.canGoBack()){
        document.getElementById('back').style.opacity = 1;
      }else{
        document.getElementById('back').style.opacity = 0.4
      }

      if(this.view.canGoForward()){
        document.getElementById('forward').style.opacity = 1;
      }else{
        document.getElementById('forward').style.opacity = 0.4
      }
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



  refresh(){
    if(this.view.canGoBack()){
      document.getElementById('back').style.opacity = 1;
    }else{
      document.getElementById('back').style.opacity = 0.4
    }

    if(this.view.canGoForward()){
      document.getElementById('forward').style.opacity = 1;
    }else{
      document.getElementById('forward').style.opacity = 0.4
    }
  }
}
