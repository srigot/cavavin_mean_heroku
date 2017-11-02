let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let VinSchema = new Schema(
  {
    nom: { type: String, required: true },
    annee: { type: Number, required: true },
    estimation: { type: Number, required: false },
    note: { type: Number, required: false },
    cepage: { type: String, required: false },
    taille: { type: Number, required: false },
    debutBoire: { type: Number, required: false },
    finBoire: { type: Number, required: false },
    commentaires: { type: String, required: false },
    degre: { type: Number, required: false },
    couleur: { type: String, required: false },
    debutTemp: { type: Number, required: false },
    finTemp: { type: Number, required: false },
    categorie: { type: String, required: false },
    appellation: { type: String, required: false },
    emplacement: []
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);


//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('vin', VinSchema);
