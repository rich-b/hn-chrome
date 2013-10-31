chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('tab.html', {
        'bounds': {
            'width': 500,
            'height': 500
        }
    });
});