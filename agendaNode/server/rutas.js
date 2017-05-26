const Router = require('express').Router();
const Users = require('./usuario.js')
const Events = require('./evento.js')

//llamando el index.html
Router.get('/',function(req,res){
  res.render('index')
})

//validar Acceso
Router.post('/validar',function(req,res){
  if(req.session.user){    
    res.send('ok')
  }else{
    res.send('denegado')
  }
})

//Cerrar session
Router.post('/cerrar',function(req,res){
  req.session.user=null;
  res.send('cerrado')
})


// ingresando usuario
Router.get('/usuario/new', function(req, res) {
    let user = new Users({
        id: Math.floor(Math.random() * 50),
        nombre: "Next U",
        email: "next@gmail.com",
        psw: "1234",
        fecha_nacimiento: new Date()
    })
    user.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})



// Acceso a la agenda
Router.post('/login',function(req, res){
  let user = req.body.user
  let pass = req.body.pass

  Users.findOne({email:user,psw:pass}).exec(function(err,usuario){
    if(err){
      console.log(err);
      return res.status(500).send()
    }
    if(!usuario){
      return res.send("noValido")
    }
    req.session.user=usuario._id
    return res.send("Validado")
  })
})

// Agregar a un evento
Router.post('/events/new', function(req, res) {
  let evento = new Events({
        id: Math.floor(Math.random() * 50),
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        allDay: req.body.allDay,
        usuario: req.session.user
    })

    evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})


//Obtener todos los eventos
Router.get('/events/all', function(req, res) {
    Events.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

//Actualizar evento
Router.post('/events/update', function(req, res){
  Events.update({id: req.body.id}, {start: req.body.start, end: req.body.end})
  .exec(function(error, docs){
    if(error){
      res.status(500)
      res.send("No puede actualizarse "+error)
    }
    res.send("Evento actulizado con exito")
  })

})

// Eliminar un evento por su id
Router.post('/events/delete/:id', function(req, res) {
    let ev = req.params.id
    Events.remove({id: ev}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})


/*
//Obtener todos los eventos
Router.get('/all', function(req, res) {
    Events.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

// Obtener un evento por su titulo
Router.get('/', function(req, res) {
    let titles = req.query.title
    Users.findOne({title: titles}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})

// Agregar a un evento
Router.post('/new', function(req, res) {
    let Schema = mongoose.Schema, ObjectId = Schema.ObjectId
    let Schema_usuario = new Schema({

    })
    let evento = new Events({
        id: Math.floor(Math.random() * 50),
        title: req.body.title,
        start: req.body.start,
        h_start: req.body.h_start,
        end: req.body.end,
        h_end: req.body.h_end,
        allDay: req.body.allDay,
        usuario:
    })
    user.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

*/
module.exports = Router
