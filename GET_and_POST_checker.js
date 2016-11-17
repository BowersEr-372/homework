//GET and POST checker
var express = require('express');

var application = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main' });
var bodyParser = require('body-parser');

var requestedData = {};

application.engine('handlebars', handlebars.engine);
application.set('view engine', 'handlebars');
application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());
application.set('port', 3000);

//handle GET request
application.get('/', function(req, res)
	{
	//header should say "GET request received
	var qData = [];
	for(var p in req.query){
	qData.push({'name':p,'data':req.query[p]});
	}
	requestedData.type = "GET";
	requestedData.dataList = qData;
	res.render('home', requestedData);

	}/*end function*/);//end application.get 
	//request,
	
//handle POST request
application.post('/', function(req, res)
	{
	//header should say "POST request received
	var qData = [];
	var cData = [];
	for(var p in req.query){
		qData.push({'name':p,'data':req.query[p]});
	}
	for(var c in req.body){
		cData.push({'name':c,'data':req.body[c]});
	}
	requestedData.type = "POST";
	requestedData.dataList = qData;
	requestedData.bodyDataList = cData;
	res.render('home', requestedData);
	}/*end function*/);//end application.post
	
application.get('/time', function(req, res)
	{
	//display the time 
	res.render('time', genContext());
	});
//standard 404
application.use(function(req, res)
	{
	res.status(404);
	res.render('404');
	}/*end function*/);//end application.use 

application.listen(application.get('port'), function()
	{
	console.log('Express started on localhost:' + application.get('port') + ' press Ctrl-C to quit.');
	}/*end function*/);//end application.listen 
	
	function genContext(){
	var stuff = {};
	stuff.time = "Kitty!"//(new Date(Date.now())).toLocaleTimeString('en-US');
	return stuff;
	}