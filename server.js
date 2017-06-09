var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var VINS_COLLECTION = "vins" ;

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server. 
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// VINS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


/*  "/vins"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/vins", function(req, res) {
  db.collection(VINS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Impossible de recuperer les vins.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

app.post("/vins", function(req, res) {
  var newVin = req.body;
  newVin.createDate = new Date();

  if (!req.body.nom) {
    handleError(res, "Saisie incorrecte", "Le nom du vin ne peut être vide.", 400);
  }

  db.collection(VINS_COLLECTION).insertOne(newVin, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Erreur a la creation du vin");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/vins/:id"
 *    GET: recherche d'un vin par id
 *    PUT: mise a jour d'un vin par id
 *    DELETE: suppression d'un vin par id
 */

app.get("/vins/:id", function(req, res) {
  db.collection(VINS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Impossible de recuperer le fin");
    } else {
      res.status(200).json(doc);  
    }
  });
});

app.put("/vins/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(VINS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Impossible de mettre a jour le vin");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/vins/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Impossible de supprimer le vin");
    } else {
      res.status(204).end();
    }
  });
});
