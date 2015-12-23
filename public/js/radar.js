var orientationoffset = {tiltLR: 0, tiltFB: 0, dir: 0};
var currentorientation = {tiltLR: 0, tiltFB: 0, dir: 0};

function generatePattern(svgparent, size, image, id){
    svgparent.append("defs")
      .attr('aria-hidden',true)
      .append('pattern')
        .attr('id', id)
        .attr('patternUnits', 'objectBoundingBox')
        .attr('width', size/2)
        .attr('height', size/2)
       .append("image")
        .attr("xlink:href", image)
        .attr('width', size)
        .attr('height', size);
}
function generateCircle(svgparent, radius) {
  svgparent.append("circle")
    .attr("r", radius)
    .attr('aria-hidden',true)
    .style("fill", "none")
    .style("stroke", "#ff6f00")
    .attr("class", "svgshadow");
}
function initRadar(divSelector, items) {
  $(divSelector).html('');
  // $(divSelector).append("<ul id='itemslist' aria-hidden=false aria-label='Help Info'/>");
  // var ul = $(divSelector).find('ul');
  // ul.hide();

  var spacetime = d3.select(divSelector);

  var svgWidth = $(window).width();
  var svgHeight = $(window).height();

  var width = svgWidth,
      height = svgHeight,
      radius = Math.min(width, height);
      radarradius = Math.round(radius/2.5);
      itemradius = Math.round(radarradius/8);

    // .attr('aria-hidden',true)
  var svg = spacetime.append("svg")
    .attr("width", radius)
    .attr("height", radius)
    .append("g")
    .attr("transform", "translate(" + radius / 2 + "," + radius / 2 + ")");

  //  <clipPath id="clipCircle">
  //   <circle r="50" cx="50" cy="50"/>
  // </clipPath>
  // <rect width="100" height="100" clip-path="url(#clipCircle)"/>

  var w = radius/7;
  var center = svg.append("g")
      .append("svg:a")
      .attr("aria-live","polite")
      .attr("id", "radarButton")
      .attr("xlink:href", "#pagecontent")
      // .attr('aria-hidden',true)
      // .attr('role', 'Nothing is in front of you.');
  center.append("title").html("Nothing")
  center.append("desc").html("is in front of you.")
  center.append("svg:image")
      .attr('aria-hidden',true)
      .attr("xlink:href", "img/arrow.png")
      .attr("x", -w/2)
      .attr("y", -w/2)
      .attr("width", w)
      .attr("height", w);
  w = radius/5
  var centerimage = center.append("svg:image")
      .attr('aria-hidden',true)
      .attr("id", "radarTargetImage")
      // .attr("xlink:href", "img/arrow.png")
      .attr("x", -w/2)
      .attr("y", -w/2)
      .attr("width", w)
      .attr("height", w);

  generateCircle(svg, radarradius);
  generateCircle(svg, radarradius*5/6);
  generateCircle(svg, radarradius*2/3);
  generateCircle(svg, radarradius/2);

  svg.append("circle")
    .attr("r", radarradius/3)
    .attr('aria-hidden',true)
    .attr("id", "selectionCircle")
    .style("stroke", "#ff6f00")
    .attr("fill","none");

  svg.append('clipPath')
  .attr('id', 'clipCircle')
  .append('circle')
    .attr('r', itemradius)
    .attr('cx','0')
    .attr('cy','0');

  svg.append('clipPath')
  .attr('id', 'clipCenterCircle')
  .append('circle')
    .attr('r', itemradius*2)
    .attr('cx','0')
    .attr('cy','0');

  $.each(items, function(key, val){
    // ul.append('<li>'+key+' blub blub</li>')
    var x = -radarradius*Math.sin((val.location.dir)*Math.PI/180);
    var y = -radarradius*Math.cos((val.location.dir)*Math.PI/180);
    // console.log(x,y)
      // .attr("onclick", "$('#"+key+"')[0].scrollIntoView()")
      // .attr("cursor", "pointer")
    var color = "black";
    if(val.status != undefined && !val.status) {
      color = "red";
    }
    if(val.status == "danger")
      color = "red";
    if(val.status == "warning")
      color = "yellow";
    if(val.status == "ok")
      color = "green";
    /* better performance (in chrome usable), no image borders, images not round */
    // var w = itemradius*2;
    // svg.append("svg:a")
    //   .attr("xlink:href", "#"+key)
    //   .append("svg:image")
    //   .attr("id", key+"radar")
    //   .attr("xlink:href", val.img)
    //   .attr("x", -w/2)
    //   .attr("y", -w/2)
    //   .attr("width", w)
    //   .attr("height", w)
    //   .attr("transform", "translate("+x+"," + y + ")")

    /* worse performance (in chrome almost unusable), icons in circles */
    if(val.img) {
      // generatePattern(svg, itemradius*2, val.img, key+'pattern');
      // generatePattern(svg, 100, val.img, key+'patternFull');
    } else {
      // var img = "img/" + key + ".png"
      // generatePattern(svg, itemradius*2, img, key+'pattern');
      // generatePattern(svg, 100, img, key+'patternFull');
    }
    var item = svg.append("svg:a")
      .attr("xlink:href", "#" + key)
        .attr("id", key+"radar");

        item.append("svg:image")
        .attr("xlink:href", val.img)
        .attr('x', -itemradius)
        .attr('y', -itemradius)
        // .attr("transform", "translate("+x+"," + y + ")")
        .attr('width', itemradius*2)
        .attr('height', itemradius*2)
        .attr('clip-path','url(#clipCircle)');

      item.append("circle")
        .attr("fill", "none")      
      .attr("r", itemradius)
      .style("stroke-width", 2)
      .style("stroke", color)



      // .attr('aria-hidden',true)

      // item.append("circle")
      // .attr("r", itemradius)
      // .style("stroke-width", 3)
      // .style("stroke", "green")
      // // // .attr("id", key+"radar")
      // .attr("transform", "translate("+x+"," + y + ")")

      // .attr('clip-path','url(#clipCircle)');
      // .attr("fill","url(#"+key+"pattern)")
    item.append("title").html(key)
    item.append("desc").html(getLocationText(key))
  });
}
var showItems = false;

function toggleShowSelectedItem() {
  showItems = !showItems
  if(showItems) $('.br_to_lengthenpage').hide();
  else $('.br_to_lengthenpage').show();
}

function updatePositions(items, direction) {
  $.each(items, function(key, val){
    var degree = val.location.dir;
    var actualDirection = degree-direction;
    // console.log(getLocation().dir,actualDirection)
    // $('#radartarget1').html(Math.round(getLocation().dir) + " " + Math.round(actualDirection));
    // var color = "black";
    // if(val.status != undefined && !val.status) {
    //   color = "red";
    //   .attr("stroke", color)
    // }
    var x = -radarradius*Math.sin(actualDirection*Math.PI/180);
    var y = -radarradius*Math.cos(actualDirection*Math.PI/180);
    var item = d3.select("#"+key+"radar")
      .attr("transform", "translate("+x+", "+y+")")
    // item.select("title").html(key)
    item.select("desc").html(getLocationText(key))
  });
}

function showItem(uri) {
  $.each(items, function(key, value) {
    if(uri == 'all' || uri == key) {
      document.getElementById(key).style.display = 'block';
    } else {
      document.getElementById(key).style.display = 'none';
    }
  })
}


var indiana;

var qrcodeactive = false;
function readqrcode() {
  if(qrcodeactive) {
    indiana.deactivateQRCodeReader("#qrcodediv");
    $("#qrcodediv").hide();
    $("#radardiv").show();
  } else {
    $("#radardiv").hide();
    $("#qrcodediv").show();
    indiana.activateQRCodeReader("#qrcodediv", function(items) {
      console.log("QRCode reader -> Items", items)
      readqrcode();

      initRadar('#radardiv', items);
      initListeners();
    });
  }

  qrcodeactive = !qrcodeactive;
}

var items;

function initListeners() {
  document.addEventListener('deviceorientation2', function(data) {
    // $("#qrcodedivdata").html(Math.round(Orientation.detail.dir));
    // console.log("deviceorientation", data)
    var dir = data.detail.orientation.dir;
    items = data.detail.items;
    updatePositions(items, dir);
  })
  var valURIold;
  var vibrating = false;
  document.addEventListener('noItemInFront', function() {
    $('#radartarget').html("No registered things in front of you");
    // $('#selectionCircle').attr("fill","none");
    vibrating = false;

    $('#mini_radar_icon').show();
    $('#mini_radar_selection').hide();
    var button = d3.select('#radarButton')
    button.attr("xlink:href", "#pagecontent")
    // button.select('image')
    //   .attr('xlink:href', 'img/arrow.png')
    $('#radarTargetImage').hide();
    button.select("title").html("Nothing")
  })
  document.addEventListener('foundItemInFront', function(item) {
    item = item.detail;
    if(item.key != 'none')
    $('#radartarget').html('You are looking at the <a href="#'+item.key+'">'+ item.value.label + '</a>');
    // else
    // $('#radartarget').html('No registered things in front of you');

    itemUnderReticule = item;

    $('#mini_radar_icon').hide();
    $('#mini_radar_selection').show();
    $('#mini_radar_selection').attr('src', ''+item.value.img);
    var button = d3.select('#radarButton');
    button.attr("xlink:href", "#"+item.key);

    //tried a stroke around the image but did not succeed
     // button.append("circle")
     //    .attr("fill", "none")      
     //    .attr("r", itemradius)
     //    .style("stroke-width", 2)
     //    .style("stroke", color);

    var centerimage = d3.select('#radarTargetImage')
    if(item.value.img) {
      // button.select('image')
      //   .attr('xlink:href', item.value.img)
      centerimage.attr('xlink:href', item.value.img)
    } else {
      // button.select('image')
      //   .attr('xlink:href', 'img/' + item.key + '.png')
      //I believe this falls back to an image if there is no semantic data about the image
      centerimage.attr('xlink:href', 'img/' + item.key + '.png')
    }



    centerimage.attr('clip-path','url(#clipCenterCircle)');

    

    $('#radarTargetImage').show();
    button.select("title").html(item.key)
    // $('#selectionCircle').attr("fill","url(#"+item.key+"pattern)");

    valURIold = item.key;
    if(!vibrating || (valURIold != item.key)){
      vibrating = true;
      // navigator.vibrate(100);
    } 
  })
}

function getIndianaData() {
  indiana.getRoomData(function(items) {
    console.log("getData -> Items", items)
    $("#radardiv").show();
    initRadar('#radardiv', items);
    initListeners();
    initScenarioSimulations(items);
    setInterval(function() {
      applyLocationTextChildren(items);
      //hack, please remove this, i'm tired right now
      updateLocationText('plantPosition');
    }, 500)
  });
}

function updateLocationText(id){
  $('#'+id).text(getLocationText('lamp2'));
}

function initScenarioSimulations(items){
    //demo scenario simulation
    simulateplant(items.lamp2);
}

function resetIndianaOrientation() {
  indiana.resetOrientation();
}
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
// data-locationaware
// das ist nur eine beispielanwendung
function applyLocationTextChildren(registeredThings){
  $.each(registeredThings, function(key, value) {
    var location = indiana.getThingCardinalPosition(key);
    var id = '#' + key;
    // console.log(location)
    // if (!$(id+"Position")) $(id).append('<p id="'+id+'Position"></p>');
    switch(location) {
      case 'N': createLocationText(id, value, 'in front'); break;
      case 'NW': createLocationText(id, value, 'in front and to the left'); break;
      case 'NE': createLocationText(id, value, 'in front and to the right'); break;
      case 'SW': createLocationText(id, value, 'behind to the left'); break;
      case 'EW': createLocationText(id, value, 'behind to the right'); break;
      case 'S': createLocationText(id, value, 'behind', true); break;
      case 'E': createLocationText(id, value, 'right'); break;
      case 'W': createLocationText(id, value, 'left'); break;
    }
  })
}
function getLocationText(id) {
  var location = indiana.getThingCardinalPosition(id);
  switch(location) {
    case 'N': return ' in front of you.';
    case 'NW': return ' in front and to the left of you.';
    case 'NE': return ' in front and to the right of you.';
    case 'SW': return ' behind to the left of you.';
    case 'EW': return ' behind to the right of you.';
    case 'S': return ' behind you.';
    case 'E': return ' right of you.';
    case 'W': return ' left of you.';
  }
}
function createLocationText(id, thing, location, no_of){
    var of = no_of ? '' : ' of';
    // if(location == 'in front') {
    //   $(id+"Position").html("<strong aria-live=true>The "+thing+" is "+location+of+" you.</strong>");
    // } else {
      $(id+"Position").html("<strong>The "+thing.label+" is "+location+of+" you.</strong>");
    // }
}

// if(item.restAPI)
// ajaxCall("POST", item.restAPI, '{"on":true}', "json");

// from http://www.developers.meethue.com/documentation/lights-api
// ct = color temperatur: warm 500 - cold 154
// sat = saturation: 0 white - 250 full color
// hue = hue: 0 red - 25500 green - 46920 blue - 65536 red

var huestate = {};
huestate['lamp2'] = "on";
huestate['lamp1'] = "on";

function on(id){
  //assume hue
  var item = items[id];
  huestate[id] = "on";
  ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":true}', "json");
}

function off(id){
  //assume hue
  var item = items[id];
  huestate[id] = "off";
  ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":false}', "json");
}

function daymode(id){
  //assume hue
  var item = items[id];
  $('#lightmode').text("day");
  ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":true, "bri":254, "ct":160, "sat":0}', "json");
}

function nightmode(id){
  //assume hue
  var item = items[id];
  $('#lightmode').text("night");
  ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":true, "bri":150, "ct":500}', "json");
}

simulatePlant = false;

function waterThePlant(id){
  var item = items[id];
  ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":true, "sat":0}', "json");

}


  //timeout make hue get red in x seconds
  // do only once !!!!
function simulateplant(item){
  // var plantWateringTimeout = 30000;
  // setInterval(function() {
  //   //should check is status of light ist already off
  //   // should be gradient anyways
  //   ajaxCall("PUT", item.restAPI + item.hueid + '/state/', '{"on":true, "sat":200, "hue": 65535}', "json");
  // }
  // ,plantWateringTimeout);
};

function simulateStock(){
// remove me
}

// tried a fix for users who move their phone into landscape mode
// window.addEventListener('orientationchange', function ()
// {
//     if (window.innerHeight > window.innerWidth)
//     {
//         document.getElementsByTagName('body').style.transform = "rotate(90deg)";
//     }
// });


function ajaxCall(method, url, payload, type){
  var menuId = $( "ul.nav" ).first().attr( "id" );
  var request = $.ajax({
    url: url,
    method: method,
    data: payload,
    dataType: type
  });
   
  request.done(function( msg ) {
//     alert( "Request done: " + JSON.stringify(msg) );
    console.log(JSON.stringify(msg));
//     $( "#log" ).html( msg );
  });
   
  request.fail(function( jqXHR, textStatus ) {
    console.log( "Request failed: " + textStatus );
  });
}


$(document).ready(function() {
  $("#radardiv").hide();
  $("#qrcodediv").hide();
  indiana = spatialAwareness();
  getIndianaData();
  //initialization of the Standard text
  $('#radartarget').html("Rotate your device to explore your surroundings");

  initvisuals();

  // initDeviceMotion();
    // if(hasGetUserMedia()) readqrcode();
    // else console.log("Browser doesn't support video capture.")
});

  var panleft = false;
  var panright = false;

function initvisuals(){

  $('#overviewbar').affix({
    offset: {
      top: function(){return $('#radar').outerHeight(true)}
    }
  });

  var element = document.getElementById('radar');
  var mc = new Hammer(element);
  // hammertime.get('swipe').set({time: 1000});
  mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
  
  mc.on('panleft', function(ev) {
    panleft = true;
  });

  mc.on('panright', function(ev) {
    panright = true;
  });

  setInterval(function(){
    if(panleft && panright){
      toggleHueState(itemUnderReticule.key);
      // alert("LR-Pan detected");
       panleft = false;
       panright = false;
    }
    if(panleft)
      panleft = false;
    if(panright)
      panright = false;
  }, 300);

}

function toggleHueState(id){
  // alert(JSON.stringify(id) + huestate[id]);
  if(huestate[id] == "on")
    off(id);
  else
    if(huestate[id] == "off")
      on(id);
}


function initDeviceMotion() {

  // Position Variables
  var x = 0;
  var y = 0;
  var z = 0;
  // Speed - Velocity
  var vx = 0;
  var vy = 0;
  var vz = 0;
   
  // Acceleration
  var ax = 0;
  var ay = 0;
  var az = 0;
   
  var delay = 10;
  var vMultiplier = delay/1000;
  window.ondevicemotion = function(data) {
    // $("#qrcodedivdata").html(Math.round(Orientation.detail.dir));
    // console.log("deviceorientation", data)
    var accel2 = data.accelerationIncludingGravity;
    var accel = data.acceleration;
    // console.log('accel gravity:',accel)
    // console.log('accel:',accel2)
    ax = Math.round(accel.x*precision)/precision;
    ay = Math.round(accel.y*precision)/precision;
    az = Math.round(accel.z*precision)/precision;
  }
  
  var epsilon = 0.0001;
  var precision_digits = 6;
  var precision = 10^(precision_digits);
  setInterval(function() {
    $('#qrcodedivdata').html('accel x: ' + ax.toFixed(precision_digits) 
      + '\ny: ' + ay.toFixed(precision_digits) + '\nz: ' + az.toFixed(precision_digits));
    vy = vy + ay*vMultiplier;
    vx = vx + ax*vMultiplier;
    vz = vz + az*vMultiplier;
 

    // var ball = document.getElementById("ball");
    // if(Math.abs(ay) > epsilon) 
    y = (y + vx*vMultiplier + ay/2 * vMultiplier*vMultiplier);
    y = Math.round(y*precision)/precision;
    // if(Math.abs(ax) > epsilon) 
    x = (x + vy*vMultiplier + ax/2 * vMultiplier*vMultiplier);
    x = Math.round(x*precision)/precision;
    // if(Math.abs(az) > epsilon) 
    z = (z + vz*vMultiplier + az/2 * vMultiplier*vMultiplier);
    z = Math.round(z*precision)/precision;
    $('#qrcodediverr').html('pos x: ' + x.toFixed(precision_digits) 
      + '\ny: ' + y.toFixed(precision_digits) + '\nz: ' + z.toFixed(precision_digits));
    // if (x<0) { x = 0; vx = 0; }
    // if (y<0) { y = 0; vy = 0; }
    // if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = 0; }
    // if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = 0; }
    
    // ball.style.top = y + "px";
    // ball.style.left = x + "px";
    // document.getElementById("pos").innerHTML = "x=" + x + "<br />y=" + y;
  }, delay);
}