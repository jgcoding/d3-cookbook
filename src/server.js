// load the express package and create our app
var express = require('express'),
	app     = express();

// set the port based on environment (more on environments later)
var port    = 1337;

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

    // get an instance of the router
	var d3router = express.Router();

    // route middleware that will happen on every request
    d3router.use(function(req, res, next) {

        // log each request to the console
        console.log(req.method, req.url);

        // continue doing what we were doing and go to the route
        next(); 
    });

    // route middleware to validate :chapter
    d3router.param('chapter', function(req, res, next, chapter) {
        // do validation on chapter here
        // blah blah validation
        // log something so we know its working
        console.log('doing chapter validations on ' + chapter);

        // once validation is done save the new item in the req
        req.chapter = chapter;
        // go to the next thing
        next(); 
    });

    // route middleware to validate :filename
    d3router.param('filename', function(req, res, next, filename) {
        // do validation on filename here
        // blah blah validation
        // log something so we know its working
        console.log('doing filename validations on ' + filename);

        // once validation is done save the new item in the req
        req.filename = filename;
        // go to the next thing
        next(); 
    });

    // create routes for the diagrams section
	// diagrams main page. the dashboard
	d3router.get('/:chapter/:filename', function(req, res) {
		res.sendFile(__dirname + '/' + req.chapter + '/' + req.filename + '.html');
	});

    app.use(express.static(__dirname + '../../public'));

	// apply the routes to our application
	app.use('/ScadaVisor/diagrams', d3router);

// start the server
app.listen(port);
console.log('D3 server running on ' + port);