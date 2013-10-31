chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('tab.html', {
        'bounds': {
            'width': 400,
            'height': 500
        }
    });
});