## Motivation
I like working with web page sand their development. I always wanted to develop such a website which will not only allow me to explore my creativity in web devlopment but should also connect to common users in some way or the other. Therefore, the first thing that came to my mind was to develop a website for an apartment which will not only allow me to use my creativity to the fullest while using the web development technologies, but also have a database of its own residents and maintain their accounts private via user registration  and authentication.

## Overview
This is a simple housing website for 'The Paradise' Apartments.
The front end is designed by using HTML, CSS, Bootstrap and jQuery. Firebase is chosen for back-end. Server-side application is written in Node and it is published with Express.
The whole appllication is made responsive by using bootstrap libraries. The application is listening on port 8080 which is specified in server.js file. 
When application is run with the command node server.js in the terminal, it renders home page as the landing page. Responsive navigation bar is created, and it provides navigation across Home, Floorplans, Aminities, Gallary, Location and special buttons are provided for the residents to log in an register new users.
To know about this project in detail, take a look at ProjectReport_NehaGadge.pdf.

## Instructions

```bash
$ npm install
```

Start the server.

```bash
$ node server.js
```
Set-up a firebase database account at: https://firebase.google.com/
Open a web browser and navigate to [http://localhost:8081/](http://127.0.0.1:8081/)
to see the example in action.  Log in using username `neha` and password `nehagadge`


## References

The following websites are being referred to build this website:
https://github.com/sniklaus/teaching-webdev						--for frontend and backend
https://github.com/passport/express-4.x-local-example 			--for authentication
http://mariechatfield.com/tutorials/firebase/step4.html     	--for new user registration
https://firebase.google.com/docs/web/setup						--for setting up firebase database
https://firebase.google.com/docs/database/web/read-and-write 	--for new user registration
https://www.w3schools.com/										--for building webpages
https://getbootstrap.com/										--for building webpages
https://google/images											--for backgrounds for webpages
http://chnw.org/goose-hollow-property/							--for aminities, floorplans, gallery photos and contact information
http://gh.chnw.org/												--for aminities, floorplans, gallery photos and contact information
https://hatchful.shopify.com/									--for 'The Paradise' logo design
