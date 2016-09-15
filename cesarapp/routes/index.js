var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* POST method to save names given as input. */
router.post('/process_post', urlEncodedParser, function (req, res) {  
  router.use(bodyParser.json());
  
  var fileString = fs.readFileSync('public/names.json');  // String from the file content

  var fileJSON = JSON.parse(fileString);
  fileJSON.push({
    first_name:req.body.first_name,
    last_name:req.body.last_name 
  });

  fs.writeFile('public/names.json', JSON.stringify(fileJSON), (err) => {
    res.send('Your name was successfully registered!')
  })
})

/* GET method to list names stored in the text file. */
router.get('/process_get', function (req, res) {  
  router.use(bodyParser.json());
  
  var fileString = fs.readFileSync('public/names.json');  // String from the file content

  var fileJSON = JSON.parse(fileString);

  var textToSend = "";

  // Iterating through the JSON array and concatening the names
  for(var i = 0; i < fileJSON.length; i++) {
    textToSend += fileJSON[i].first_name + " " + fileJSON[i].last_name + "<br>";
  }

  res.send(textToSend);
})

module.exports = router;
