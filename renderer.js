const remote = require('electron').remote;

function closeWindow() {
  let window = remote.getCurrentWindow();
  window.close();
}

document.getElementById("close-btn").addEventListener("click", closeWindow);

