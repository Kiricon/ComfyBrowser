const remote = require('electron').remote;

document.getElementById("min-btn").addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       window.minimize();
  });

  document.getElementById("max-btn").addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       if (!window.isMaximized()) {
           window.maximize();
       } else {
           window.unmaximize();
       }
  });

  document.getElementById("close-btn").addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       window.close();
  });


//####### Listen for search combo
var searchBar = document.getElementById('searchBar');
var webview = document.getElementById('webView');

document.addEventListener("keydown", function(e) {
     if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey))      {
       e.preventDefault();

       searchBar.style.display = "block";
       searchBar.focus();

     }
   }, false);


searchBar.addEventListener('keypress', function(e){
  var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      webView.src = searchBar.value;
      searchBar.value = "";
      searchBar.style.display = "none";
    }
});

//Returns properly formatted url
function url(input){
  var url = input;

  return url;
}
