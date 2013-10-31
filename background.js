chrome.app.runtime.onLaunched.addListener(function () {
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 600;
    var height = 350;

    chrome.app.window.create('tab.html', {        
        id: "hacked-news",
        singleton: true,
        bounds: {
            width: width,
            height: height,
            left: 4,
            top: Math.round((screenHeight - height) - 30)
        }
    });
});