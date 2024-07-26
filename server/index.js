const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3005
const path = require('path')
const cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.use(express.static('public'))
app.get('/', (request, response) => {
  
  response.json({ info: 'gpanel@berkcosar.com API SERVER is running' })
})



app.post('/getcolumns', db.getcolumns)
app.post('/gettables', db.gettables)
app.post('/getdatabases', db.getdatabases)


app.post('/hard', db.hard)
app.post('/getFinders', db.getFinders)
app.post('/addFinder', db.addFinder)
app.post('/delFinders', db.delFinders)











app.listen(port, () => {
    console.log(`HPanel Api Server running on port ${port}.`)
  })