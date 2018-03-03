(function() {
    const LINE_LENGTH = 20;
    const dictationArea = document.getElementById('dictation');
    
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
            chunk
        }));
    }

    dictationArea.addEventListener('input', function(event) {
        var contents = event.target.value;
        if (contents.length > LINE_LENGTH) {
        event.target.value = '';
            // Send one line of text to server and remove sent text from text area.
            sendContents(contents);
        }
    });
    dictationArea.addEventListener('keypress', function(event) {
        var key = (event.keyCode ? event.keyCode : event.which);
        if (key === 13) {
            var contents = event.target.value;
            sendContents(contents, true);
            event.target.value = '';
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
