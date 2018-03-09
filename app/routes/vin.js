let Vin = require('../models/vin')

/*
 * GET /vin route to retrieve all the vins.
 */
function getVins(req, res) {
  //Query the DB and if no errors, send all the vins
  Vin.find({}).populate('emplacements').exec().then(vins => {
    res.json(vins)
  }).catch(err => {
    res.send(err)
  })
}

/*
 * POST /vin to save a new vin.
 */
function postVin(req, res) {
  //Creates a new vin
  var newVin = new Vin(req.body)

  //    if (!req.body.nom) {
  //      handleError(res, "Saisie incorrecte", "Le nom du vin ne peut être vide.", 400);
  //    }

  //Save it into the DB.
  newVin.save((err,vin) => {
    if(err) {
      if(err.name == 'ValidationError') {
        res.status(400).json(err)
      } else {
        res.status(500).send(err)
      }
    }
    else { //If no errors, send it back to the client
      res.status(201).json({message: 'Vin successfully added!', vin })
    }
  })
}

/*
 * GET /vin/:id route to retrieve a vin given its id.
 */
function getVin(req, res) {
  Vin.findById(req.params.id, (err, vin) => {
    if(err) res.send(err)
    //If no errors, send it back to the client
    res.json(vin)
  })
}

/*
 * DELETE /vin/:id to delete a vin given its id.
 */
function deleteVin(req, res) {
  if (req.params.id == 'ALL') {
    Vin.remove((err, result) => {
      res.json({ message: 'ALL DELETED !', result })
    })
  } else {
    Vin.remove({_id : req.params.id}, (err, result) => {
      res.json({ message: 'Vin successfully deleted!', result })
    })
  }
}

/*
 * PUT /vin/:id to updatea a vin given its id
 */
function updateVin(req, res) {
  Vin.findById({_id: req.params.id}, (err, vin) => {
    if(err) {
      res.status(404).send(err)
    } else {
      Object.assign(vin, req.body).save((err, vin) => {
        if(err) {
          res.status(400).send(err)
        } else {
          res.json({ message: 'Vin updated!', vin })
        }
      })
    }
  })
}

//export all the functions
module.exports = { getVins, postVin, getVin, deleteVin, updateVin }
