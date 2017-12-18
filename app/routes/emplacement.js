let mongoose = require('mongoose');
let Vin = require('../models/vin');
let Emplacement = require('../models/emplacement');


/*
 * GET emplacement recuperer tous les emplacements occupes
 */
function getEmplacements(req, res) {
    //Query the DB and if no errors, send all the vins
    Emplacement.find({}).exec().then(emplacements => {
      res.json(emplacements);
    }).catch(err => {
      res.status(400).send(err);
    });
}

/*
 * ADD emplacement to add a new emplacement
 */
function addEmplacement(req, res) {
  Vin.findById({_id: req.params.id}, (err, vin) => {
    if(err) {
      res.status(404).send(err);
    } else {
      //Creates a new Emplacement
      var newEmplacement = new Emplacement(req.body);
      newEmplacement.vin = vin ;
      //Save it into the DB.
      newEmplacement.save((err,emplacement) => {
        if(err) {
          res.send(err);
        } else { //If no errors, send it back to the client
          vin.emplacements.push(emplacement._id);
          vin.save().then(vin => {
            res.json({message: "Emplacement successfully added!", vin });
          }).catch(err => {
            res.status(400).send(err);
          });
        }
      });
    }
  });
}

/*
 * DELETE emplacement
 */
function deleteEmplacement(req, res) {
    Emplacement.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Emplacement successfully deleted!", result });
    });
}

module.exports = { getEmplacements, addEmplacement, deleteEmplacement }
