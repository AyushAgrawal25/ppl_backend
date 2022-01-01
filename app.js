const express = require('express')
const app = express()
const routes=require('./routes/routes');
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, ()=>{
    console.log("Running on PORT : 3000");
})