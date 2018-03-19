const express = require('express')
const app = express();
const screenshot = require('desktop-screenshot');
const bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.2:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/', (req, res) => {
  let imgTimeStamp = req.body.timestamp

  screenshot("screenshot"+ imgTimeStamp + '.png', function(error, complete) {
    if(error)
      console.log("Screenshot failed", error);
    else
      console.log("Screenshot succeeded");
    res.send('success')
  });
})





app.listen(8080, () => console.log('Example app listening on port 8080!')); //the server object listens on port 8080


