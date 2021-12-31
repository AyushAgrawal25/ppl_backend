const express = require('express')
const app = express()
const routes=require('./routes/routes');

app.use(express.json());
app.use('/', routes);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, ()=>{
    console.log("Running on PORT : 3000");
})