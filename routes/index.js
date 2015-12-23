var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/kitchen', function(req, res) {
  res.render('kitchen', { title: 'Kitchen' });
});

router.get('/tillsoffice', function(req, res) {
  res.render('tillsoffice', { title: 'Tills Office' });
});

router.get('/matthiasoffice', function(req, res) {
  res.render('matthiasoffice', { title: 'Matthias Office' });
});

router.get('/livinglab', function(req, res) {
  res.render('livinglab');
});

router.get('/livinglab2DM', function(req, res) {
  res.render('livinglab2DM');
});

router.get('/iot2015', function(req, res) {
  res.render('iot2015');
});
// router.get('/livinglab.html', function(req, res) {
//   res.render('livinglab2DM');
// });

// hue user: 1d004c62883d0d72b77af7e9fd46e3
// {"devicetype":"indiana#mobile teco"}

var bridgeip = "http://129.13.169.230:8000";
// var bridgeip = "http://192.168.1.100";

// Teco Hue Bridge User
// var hueuser = "1d004c62883d0d72b77af7e9fd46e3";
var hueuser = "newdeveloper"

// Position 2: http://192.168.1.101:3000/495dd34b
// Position 1: http://192.168.1.101:3000/17ad0b49e

router.get('/495dd34b', function(req, res) {
  res.render('iot2015');
});

router.get('/17ad0b49e', function(req, res) {
  res.render('iot2015');
});

router.get('/495dd34b/items', function(req, res) {
	res.json( {
	  "laptop": {
	    location: {dir: 120},
	    label: "laptop",
	    img: "img/laptop.jpg",
	  },
	  "lamp1": {
	    location: {dir: 0},
	    label: "office lamp",
	    img: "img/lamp.png",
	  	hueid: "1",
	    restAPI: bridgeip + "/api/" + hueuser + "/lights/"
	  },
	"flower": {
	    location: {dir: 100},
	    label: "office flower",
	    img: "img/flower2.jpg"
	  },
	  "lamp2": {
	    location: {dir: 200},
	    img: "img/flowerlamp.jpg",
	    label: "plant life signal",
	    status: "danger",
	    hueid: "2",
	    restAPI: bridgeip + "/api/" + hueuser + "/lights/"
	  }
	});
});

router.get('/17ad0b49e/items', function(req, res) {
	res.json( {
	  "laptop": {
	    location: {dir: 0},
	    label: "laptop",
	    img: "img/laptop.jpg",
	  },
	  "lamp1": {
	    location: {dir: 180},
	    label: "office lamp",
	    img: "img/lamp.png",
	  	hueid: "1",
	    restAPI: bridgeip + "/api/" + hueuser + "/lights/"
	  },
	"flower": {
	    location: {dir: 100},
	    label: "office flower",
	    img: "img/flower2.jpg"
	  },
	  "lamp2": {
	    location: {dir: 160},
	    img: "img/flowerlamp.jpg",
	    label: "plant life signal",
	    status: "danger",
	    hueid: "2",
	    restAPI: bridgeip + "/api/" + hueuser + "/lights/"
	  }
	});
});

router.get('/iot2015/items', function(req, res) {
	res.json( {
	  "laptop": {
	    location: {dir: 0},
	    label: "laptop",
	    img: "img/laptop.jpg",
	  },
	  "lamp1": {
	    location: {dir: 180},
	    label: "office lamp",
	    img: "img/lamp.png",
	  	hueid: "1",
	    restAPI: bridgeip + "/api/" + hueuser + "/lights/"
	  },
	"flower": {
	    location: {dir: 100},
	    label: "office flower",
	    img: "img/flower2.jpg"
	  },
	  "lamp2": {
	    location: {dir: 160},
	    img: "img/flowerlamp.jpg",
	    label: "plant life signal",
	    status: "danger",
	    hueid: "2",
	    restAPI: bridgeip + "/api/" + hueuser + "/lights/"
	  }
	});
});

router.get('/livinglab/items', function(req, res) {
	var livinglab_items = {
	  "EmbeddedBusinessSystems": {
	    location: {dir: 50},
	    img: "demosTECOIntranet/EBS_front_radar.png"
	  },
	  "VDAR": {
	    location: {dir: 60},
	    img: "demosTECOIntranet/VDAR_Logo_radar.png"
	  },
	  "AudioLedLampe": {
	    location: {dir: 40},
	    status: true,
	    controlON: "http://tecodemopc.teco.edu:5000/plugwise/000D6F0000C3A9FC/on",
	    controlOFF: "http://tecodemopc.teco.edu:5000/plugwise/000D6F0000C3A9FC/off",
	    img: "demosTECOIntranet/ThumbAudioLed_radar.png"
	  },
	  "LedPowerDemo": {
	    location: {dir: 110},
	    img: "demosTECOIntranet/ThumbLedPower_radar.png",
	  },
	  "AudioLedLampe1": {
	    location: {dir: 160},
	    status: true,
	    img: "demosTECOIntranet/ThumbAudioLed_radar.png"
	  },
	  "PointAndClick": {
	    location: {dir: 180},
	    img: "demosTECOIntranet/ThumbPointAndClick_radar.png",
	  },
	  "HealthCareDemo": {
	    location: {dir: 190},
	    img: "demosTECOIntranet/ThumbKneeGuard_radar.png",
	  },
	  "TecoEnvboard": {
	    location: {dir: 200},
	    img: "demosTECOIntranet/envboard-demo-neu_radar.png",
	  },
	  "RfidCommunicationDemo": {
	    location: {dir: 260},
	    img: "demosTECOIntranet/ThumbRfidCollab_radar.png",
	  },
	  "AudioLedLampe2": {
	    location: {dir: 270},
	    status: true,
	    controlON: "http://tecodemopc.teco.edu:5000/plugwise/000D6F0002768C43/on",
	    controlOFF: "http://tecodemopc.teco.edu:5000/plugwise/000D6F0002768C43/off",
	    img: "demosTECOIntranet/ThumbAudioLed_radar.png"
	  },
	  "MachineHealthDemo": {
	    location: {dir: 280},
	    img: "demosTECOIntranet/ThumbMachineHealth_radar.png",
	  },
	  "AudioLedLampe3": {
	    location: {dir: 320},
	    status: true,
	    img: "demosTECOIntranet/ThumbAudioLed_radar.png"
	  },
	  "LandmarkeDemo": {
	    location: {dir: 330},
	    img: "demosTECOIntranet/Landmarke Demo_radar.png",
	  },
	};
  res.json(livinglab_items);
});

router.get('/kitchen/items', function(req, res) {
	var kitchen_items = {
	  "microwave": {
	    location: {dir: 350},
	  },
	  "flower": {
	    location: {dir: 270},
	    img: "img/flower.jpg"
	  },
	  "lamp": {
	    location: {dir: 80},
	    controlON: "http://cumulus.teco.edu:81/21345gjphtnch87/ON",
	    controlOFF: "http://cumulus.teco.edu:81/21345gjphtnch87/OFF"
	  },
	  "coffeemachine": {
	    location: {dir: 190},
	    img: "img/coffeemachine.jpg"
	  },
	  "fridge": {
	    location: {dir: 200},
	    img: "img/fridge.jpg"
	  }
	};
  res.json(kitchen_items);
});
router.get('/tillsoffice/items', function(req, res) {
	var tillsoffice_items = {
	  "thesis": {
	    location: {dir: 80},
	  },
	  "flower": {
	    location: {dir: 300},
	    img: "img/flower.jpg"
	  },
	  "telephone": {
	    location: {dir: 160},
	  }
	};
  res.json(tillsoffice_items);
});
router.get('/matthiasoffice/items', function(req, res) {
	var matthiasoffice_items = {
	  "cardboard": {
	    location: {dir: 190},
	  },
	  "flower": {
	    location: {dir: 250},
	    img: "img/flower.jpg"
	  },
	  "budde": {
	    location: {dir: 0},
	  }
	};
  res.json(matthiasoffice_items);
});
module.exports = router;
