(function() {
    const LINE_LENGTH = 20;
    const dictationArea = document.getElementById('script');
    
    // util
    function sendContents(chunk, newline) {
        newline = newline || false;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/sendChunk');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            // Report failed send attempts
            if (xhr.status !== 200) {
                console.log(xhr.response);
            }
        };
        xhr.send(JSON.stringify({
            newline,
            chunk: ' ' + chunk
        }));
    }

    dictationArea.addEventListener('keypress', function(event) {
        var key = (event.keyCode ? event.keyCode : event.which);
        if (key === 13) {
            // Get substring up to next ^ and send.
            var lines = event.target.value.split('^');
            sendContents(lines.shift());
            event.target.value = lines.join('^');
            event.preventDefault();
        }
    });
    document.getElementById('clear').addEventListener('click', function(event) {
        if (window.confirm('This will delete all captions for the current event.')) {
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/api/clearAll');
            xhr.send();
        }
    });
})();
