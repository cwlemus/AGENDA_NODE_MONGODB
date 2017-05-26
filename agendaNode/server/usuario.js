const mongoose = require('mongoose')

const Schema = mongoose.Schema

let usuarioSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  nombre: { type: String, required: true },
  email: { type: String, required: true},
  psw: { type: String, required: true},
  fecha_nacimiento: { type: Date, required: true}
})

let UserModel = mongoose.model('usuario', usuarioSchema)

module.exports = UserModel
