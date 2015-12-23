var page = require('webpage').create();

page.viewportSize = {
  width: 480,
  height: 800
};

page.open('http://localhost:3000/iot2015', function() {
  page.render('capture.png');
  phantom.exit();
});

