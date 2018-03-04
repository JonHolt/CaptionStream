(function() {
  // data 
  var currentLine = 0;
  // Start where the server currently is, to avoid stale captions
  let firstLineXHR = new XMLHttpRequest();
  firstLineXHR.open('GET', '/api/currentLine');
  firstLineXHR.onreadystatechange = function (test) {
    if (firstLineXHR.response) {
      currentLine = JSON.parse(firstLineXHR.response).currentLine;
    }
  };
  firstLineXHR.send();
  
  function recieveNewLines(event){
    if (event.target.readyState === 4 &&
        event.target.status === 200 &&
        event.target.response) {
      let res = JSON.parse(event.target.response);
      Object.keys(res).forEach(function(key) {
        // If has newline, remove id from #current-line, and append a new <p id="current-line">
        if (res[key].newline) {
          document.getElementById('current-line').removeAttribute('id');
          document.getElementById('scroller').innerHTML += '<p id="current-line"></p>';
        }
        // Otherwise append text to #current-line
        else {
          document.getElementById('current-line').innerText += res[key];
        }
        // Set value of last line recieved
        currentLine = Number(key);
      });
    }
  }

  setInterval(function(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/linePoll/' + currentLine);
    xhr.onreadystatechange = recieveNewLines;
    xhr.send();
  },1000);

  function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll, 10);
  }
  pageScroll();
})();