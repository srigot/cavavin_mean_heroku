let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let vin = require('./app/routes/vin');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };

//db connection
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  keepAlive: true,
  connectTimeoutMS: 30000
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "API CaveAVin"}));

app.route("/vins")
    .get(vin.getVins)
    .post(vin.postVin);
app.route("/vin/:id")
    .get(vin.getVin)
    .delete(vin.deleteVin)
    .put(vin.updateVin);

app.listen(process.env.PORT || port);
console.log("Listening on port " + port);

module.exports = app; // for testing
