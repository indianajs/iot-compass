var http = require('http');
var app = require('./app.js');

http.createServer(app)
    .listen(
            app.get('port'), function(){
                            console.log("Express server listening on port %s in %s mode."
                                , app.get('port')
                                , app.settings.env);
                            });


/** Code for simulating some behaviour with the Hue Light Bulbs **/

// var bridgeip = "129.13.169.230";
var bridgeip = "192.168.1.100";
// var hueuser = "newdeveloper";
var hueuser = "1d004c62883d0d72b77af7e9fd46e3";

var options = {
  host: bridgeip,
  path: "/api/" + hueuser + "/lights/" + 2 + '/state/',
  method: "PUT"
};

var req;

var plantWateringTimeout = 40000;
setInterval(function() {
    //should check is status of light ist already off
    // should be gradient anyways
    // ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":true, "sat":200, "hue": 65535}', "json");
    req = http.request(options, function(){});

    //This is the data we are posting, it needs to be a string or a buffer
    req.write('{"on":true, "sat":200, "hue": 65535}');
    req.end();
}
,plantWateringTimeout);
