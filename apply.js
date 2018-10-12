/* 
 this is a javascript code to run new user registration
 After successful registration, new user is added to the database

 REFERENCES : http://mariechatfield.com/tutorials/firebase/step4.html
 https://firebase.google.com/docs/web/setup
 https://firebase.google.com/docs/database/web/read-and-write
*/

//code to connect to the database
var config = {
    apiKey: "AIzaSyC1yN49tT12sbESftaOAvb5FNQL6o1JYHk",
    authDomain: "neha-gadge-database.firebaseapp.com",
    databaseURL: "https://neha-gadge-database.firebaseio.com",
    projectId: "neha-gadge-database",
    storageBucket: "neha-gadge-database.appspot.com",
    messagingSenderId: "595583846697"
  };
  firebase.initializeApp(config);
  
  var applications = firebase.database().ref("users");

// Save a new application to the database, using the input in the form
var submitApplication = function () {

  // Get input values from each of the form elements
  var displayname = $("#displayname").val();
  var email = $("#email").val();
  var id = $("#id").val();
  var username = $("#username").val();
  var password = $("#password").val();

  // Push a new user application to the database using those values
  applications.push({
    "displayName": displayname,
    "email": email,
    "id" : id,
    "username": username,
    "password" : password
  });
};

//When the window is fully loaded, call this function.
$(window).load(function () {

  // Find the HTML element with the id applicationform, and when the submit
  // event is triggered on that element, call submitApplication.
  $("#applicationform").submit(submitApplication);
});