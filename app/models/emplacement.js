let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let EmplacementSchema = new Schema(
  {
    ligne: { type: String, required: true },
    colonne: { type: Number, required: true },
    
  },
  {
    versionKey: false
  }
);


//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('emplacement', VinSchema);
