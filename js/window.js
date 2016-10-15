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

document.addEventListener("keydown", function(e) {
     if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey))      {
       e.preventDefault();
       alert('yes');
     }
   }, false);
