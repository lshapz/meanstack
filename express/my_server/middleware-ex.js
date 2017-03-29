var express = require('express');
var app = express();

var port = 8000; 

app.use(log)
// declares log twice, once because it's used for all requests up here and once in the callback

// app.use(bodyParser())
// app.use(cookieParser())
// app.get('/', function(req, res){
//   res.render('index');
// })
app.get('/', log, hello)

function log(req, res, next){
  console.log(new Date(), req.method, req.url); 
  next()
}
// custom middleware - hoisted 


function hello(req, res, next){
  res.write('Hello \n' + 'World');
  res.end();
  next();
}


app.listen(port, function(err, res){
  if(err){
    console.log('server error');
  }
  else {
    console.log('server started on port 8000');
  }
});