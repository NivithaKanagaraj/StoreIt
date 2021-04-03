var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())
const http = require("http");
const server = http.createServer(app);
app.post('/upload',function(req, res) {
     

    return res.status(200).send(req.file)

  });

  app.use(express.static('task_react/build'));
    app.get(' * ', (req,res) =>{
        res.sendFile(path.join(__dirname, 'task_react/build' , 'index.html'));
    });


server.listen(8000, function() {

  console.log('App running on port 8000');

});