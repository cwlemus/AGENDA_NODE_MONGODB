const mongoose = require('mongoose')
const usuario = require('./usuario.js')
const Schema = mongoose.Schema

let eventoSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: false},
  allDay: { type: Boolean, required: false },
  usuario: {type: Schema.ObjectId, ref: "usuarios"}
})


let EventoModel = mongoose.model('evento', eventoSchema)

module.exports = EventoModel
