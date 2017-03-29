var User = require('../models/User.model')


exports.register = function(req, res){
  var newUser = new User();
// don't need to re-require body-parser middleware because it's at the root
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  newUser.save(function(err, user){
    if (err){
      console.log(err.message);
      console.log(err.errors.username.message);
      // console.log(err.errors.email.message);
      // console.log(err.errors.password.message);
      res.send('error registering user');
    } else {
      console.log(user);
      res.redirect('/signup.html');
    }
  });
}