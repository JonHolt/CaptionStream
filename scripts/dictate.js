(function() {
    const LINE_LENGTH = 20;
    const dictationArea = document.getElementById('dictation');
    dictationArea.addEventListener('input', function(event) {
        var contents = event.target.value;
        if (contents.length > LINE_LENGTH) {
            // Send one line of text to server and remove sent text from text area.
        }
    });
})();
