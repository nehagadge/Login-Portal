var admin = require('firebase-admin');
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


/*
 establishing connection to firebase database
 REFERENCES : https://firebase.google.com/docs/web/setup
              https://firebase.google.com/docs/database/web/read-and-write
 */

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'neha-gadge-database',
    clientEmail: 'firebase-adminsdk-hyxne@neha-gadge-database.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEQhV9AAi0nhCy\nUHU7FUOQLnNYFGf/gpdTHLfcQuwpQJeRoQ/y36FoOIHNjNuPzeNIkr4/i2uu/13g\nc1rmFCMDxyKuH/bCVVudiMxIsLiwarupl+V8YvJIdaqZNt21fR6rf0oSIfx4zPG9\ntKMUpSR8Ycl80dDWWlkraiDEdlviAWPk/8gci6Ph4ZNhdNiP1syxrZ12uBjE9YYa\nl5//6fZL4dfSMUe9Zy67Uq1Azu28kCJ+qcMdIOYJX9jYFgRUwrKVCtaM5t2kuLtF\nhghnEIU3bzE9ZNEF4RUMB15uE8qrnYzacE4coBbqAQQLUEP796ORdNPEXCgL1nsG\nLMFM30lTAgMBAAECggEAMe6mTPFPRbTZhqSVzvxv/iTzT7uRYh61pX2vAak9MJmw\ndmrGBgMDq+KEk+l8iy/U3cgIA17TfOiX191BiTwiVHm7xxV20Kaq8n+1ieD8fFYL\nfPCagHUkM29MgkLFUcGNphBypf5jn9B0yNFGlKAXklXGz60KNx8xhKwxvgpnAi7p\ndh1VaElEqvlBe0ZUNeLS4plnN7zV+R3uYgnD2JTwVpsng8dK/PIimMNhB7DQDjNb\nnUIiPQQGRhWXueWbX6xbOUYthpYJYzTyNk2tbkMBpP7qr5bA64cMUxb8HafKzq2m\nH28Wo4E76ATA3hX3vgntNdoyJMD6s2X7GZJOatVEYQKBgQD9KxaVGhXd9T2PXcGR\nv70P/WQrbDlfTOH8TB8gaW1H2hIdiKvdb40o+ja5QxKPNfjwnzlYibGYUBt5FM33\nHtCasD8mwyRYk+DOSFqHK8MlBIGdO7vHnFpTe1CFK1PcU1oT2gvhRIHs03L/B9x5\n2Ydm+G9EoYAKqZ029BAPIKOr6wKBgQDGdAqdgWvHZQLkSVh0aKJuOjGHJkiX6Fc5\nHD96bH/MotOoAKRqwtN9MFQWdUdR66eYTNmnucCgE6tGQOl0w5lOnk2AXZZs+Qpy\nY7NaugVukc1u750NrRTGoTbYc9nPO1yb5e92idF3+KLyo1vfMvauZj4HRq1TkyjM\nsNfSThOGOQKBgCXYfB678Irmr1YwONCV7ihmw8OuAQGbF6lEo96PhBOaqNybYr3O\ngDag+O9G9I5ODjHCS6tNoivXxdOa5ZNMmviU4kvkHhnTuWZ88HOGejydaNbdaBvV\n5rbWF1pg+L9WAoA3N1FskVOa5HT1cuMQPqqI9vE2h1KQunzNjV0FjxITAoGAflCK\nGSqxYV8H8ipFJQMcsDBWKgHSHu6B5hX2yYOZ7LSPJ9YQ0OtlFb/XJdxMIvZt3GC+\nASYYV0ttru/OKMX/JK1aAySOhJoXbivLkynoHzKqobveKUBLgwpGEIvczSypi4lV\nXAvoygX2IZ6c8XpMzUDCpnr0A8gdJfxBwthzUPECgYBfEeYHfwHHZkJgKiHRUTPx\nzOOyjuslEl6qCw/9JjbMkCmHWSpgl71V86yoeakFsJiSxtHm/svdzovZEJGjPQFJ\n5vtP6TWRuNLBt2H5CwIrdlP9if8PhqFpdsVvNl1MVeSXauyHVWORz6gjJHhLQNYk\nGuGMm5Doq0rQlgCg7qGgow==\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://neha-gadge-database.firebaseio.com'
});


/* This is a code to display data from the 
database in the console suceessfully for testing
Get a reference to the database service
display database in console for test */

var database = admin.database();
var records=[];
 admin.database().ref('/users/').once('value').then(function(snapshot) 
 {
   console.log(snapshot.val());
   records= snapshot.val();
});
//database is displayed in console successfully!!


/* The functions: findById() and findByUsername(), serializeUser() and deserializeUser()
are referred from https://github.com/passport/express-4.x-local-example
The basic authentication is done in this part */

//function to find username by ID
findById = function(id, cb) {
  process.nextTick(function() {
    var k = id - 1;
    if (records[k]) {
      cb(null, records[k]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
};

//function to find username by username
findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

 /* 
 Configure the local strategy for use by Passport which requires a `verify` function which receives the credentials
 (`username` and `password`) submitted by the user.  The function verifies that the password is correct and then 
 invoke `cb` with a user object, which will be set at `req.user` in route handlers after authentication.
 */
passport.use(new Strategy(
  function(username, password, cb) {
    findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

 /* 
 Configure Passport authenticated session persistence:
 Supplying the user ID when serializing, and querying the 
 user record by ID from the database when deserializing. 

REFERENCE : https://github.com/passport/express-4.x-local-example
 */
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
//REFERENCE: https://github.com/sniklaus/teaching-webdev/blob/master/express/6-auth.js
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(__dirname + "/"));

// Define routes.
//when website is launched, it will go to default homepage
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

//code to go to aminities page
app.get('/aminities',
  function(req, res) {
    res.render('aminities');
  });

//this renders login page for existing residents
app.get('/login',
  function(req, res){
    res.render('login');
  });

/*
 this posts the login data through login form and authenticates it
 if authentication is sucessful, it will go to home page and show  
 "Hello Username, view ur profile"
 A resident ser can view his profile now.
 If authentication is unsuccessful, nothing will happen and form will be empty
 after pressing login button
*/
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//this functions logs out a user successfully and goes back to homepage
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

//this function renders the profile of individual resident after logging in successfully
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

//this function renders the application form which accepts new users (to add to database)
app.get('/apply',
  function(req, res){
    res.render('apply');
  });
  
 //on successful registration, this page goes back to homepage
 //on unsuccessful registration, nothing happens and control stays on application page
app.post('/apply', 
  function(req, res) {
    res.redirect('/');
  });

//app listens to port 8081  
app.listen(8081);