var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())

app.post('/upload',function(req, res) {
     

    return res.status(200).send(req.file)

  });


app.listen(8000, function() {

  console.log('App running on port 8000');

});