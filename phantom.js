var system = require('system');
var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open('./index.html', function(status) {
    console.log("Status: " + status);
    phantom.exit();
});
