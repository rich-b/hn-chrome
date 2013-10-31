chrome.app.runtime.onLaunched.addListener(function () {
	var screenWidth = screen.availWidth;
	var screenHeight = screen.availHeight;
	var width = 600;
	var height = 200;

    chrome.app.window.create('tab.html', {
        'bounds': {
            width: width,
            height: height,
            left: Math.round((screenWidth-width) - 10),
      		top: Math.round((screenHeight-height) - 30)
        }
    });
});