var express = require('express');
var app = express();
var port = 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.engine('html', swig.renderFile);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, function() {
  console.log('server started on port 8000 ');
});