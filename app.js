require('dotenv').config()
const express = require('express')
const app = express()
const routes=require('./routes/routes');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());

app.use('/', routes);

app.get('/', function (req, res) {
  res.send('Hello World')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Running on PORT : ${PORT}`);
})