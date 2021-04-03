var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())
const http = require("http");
const server = http.createServer(app);
app.post('https://store--it.herokuapp.com/upload',function(req, res) {
     

    return res.status(200).send(req.file)

  });
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('task_react/build'));
    app.get(' * ', (req,res) =>{
        res.sendFile(path.join(__dirname, 'task_react/build' , 'index.html'));
    });
  }

  const port = process.env.PORT || 8000;
  server.listen(port, function() {

  console.log(`Server is running on port ${port}` );

});