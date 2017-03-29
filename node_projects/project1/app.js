var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// grab front end and params from url 
var mongoose = require('mongoose');
var Book = require('./Book.model');
// requires the model so it's in the app
var port = 8080;
var db = 'mongodb://localhost/example'
// local instance ^
mongoose.connect(db);
//connects to example

app.use(bodyParser.json())
// allows us to parse Json elements 
app.use(bodyParser.urlencoded({
  extended: true
}));
// allows us to get url params

// request is user input, res is user view
app.get('/', function(req, res) {
  res.send('happy to be here');
});
// all books books_path
app.get('/books', function(req, res) {
  console.log('getting all books');
  Book.find({})
  // .all or .where 
  // will find examples of the model in the db 
    .exec(function(err, books) {
      // execute once all books found
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        // shows up in terminal and not Chrome, like it's a server or something
        res.json(books);
        // shows them as JSON not as anything fun
      }
    });
});
// "node app" is not live updating 
// books/:id book_path(foo)
app.get('/books/:id', function(req, res) {
  console.log('getting one book');
  Book.findOne({
    // 
    _id: req.params.id
    // oh that's gonna be a terrible URL 
    // like books/587146dbbff4bdee5e2439f3
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});
// new_book_path(foo) post books
// we are using postman in lieu of creating forms 
app.post('/book', function(req, res) {
  var newBook = new Book();
  // references new model instance / new schema 
  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;
// initializing based on params found in body 
  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});
// alternate method, works if keys and values are clearly defined in body? 
app.post('/book2', function(req, res) {
  Book.create(req.body, function(err, book) {
    // book.create is a mongoose method
    // don't specify params
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

// update edit_book_path
// notice this supports put vs post 
// we use put because we know the specific URI 
app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
    _id: req.params.id
    // find by id - 'query' 
    },
    { $set: { title: req.body.title }
    // update by set, since object you can pass in a bunch
    // upsert true is a flag to insert if nothing in field/column
  }, {upsert: true}, function(err, newBook) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newBook);
      res.send(newBook);
      res.status(204)
    }
  });
});
// delete_book 
app.delete('/book/:id', function(req, res) {
  // 
  Book.findOneAndRemove({
    _id: req.params.id 
    // no options because we're deleting the whole dude
  }, function(err, book) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(book);
      res.status(204);
    }
  });
});


app.listen(port, function() {
  console.log('app listening on port ' + port);
});