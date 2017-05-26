const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session = require('express-session');

const PORT = 8082
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/agenda')


app.use(express.static(__dirname.substring(0,(__dirname.length-7))+'/client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({secret: "appAgenda",
    resave: true,
    saveUninitialized: true}))
app.use('/',Routing)


Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
