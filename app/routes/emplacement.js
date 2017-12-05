let mongoose = require('mongoose');
let Emplacement = require('../models/emplacement');


/*
 * GET emplacement recuperer tous les emplacements occupes
 */
function getEmplacements(req, res) {
    //Query the DB and if no errors, send all the vins
    let query = Emplacement.find({});
    query.exec((err, emplacements) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(emplacements);
    });
}

/*
 * ADD emplacement to add a new emplacement
 */
function addEmplacement(req, res) {
    //Creates a new vin
    var newEmplacement = new Emplacement(req.body);

    //Save it into the DB.
    newEmplacement.save((err,emplacement) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Emplacement successfully added!", emplacement });
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
