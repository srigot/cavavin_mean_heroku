let mongoose = require('mongoose')
let Schema = mongoose.Schema

//book schema definition
let EmplacementSchema = new Schema(
  {
    rangee: { type: String, required: true },
    colonne: { type: Number, required: true },
    vin : { type: Schema.ObjectId, ref:'vin', required:true }
  },
  {
    versionKey: false
  }
)


//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('emplacement', EmplacementSchema)
