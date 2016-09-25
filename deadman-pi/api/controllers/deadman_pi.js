'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');


/* GrovePi */
var GrovePi = require('node-grovepi').GrovePi;
var Commands = GrovePi.commands;
var Board = GrovePi.board;

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  status: status, kill: kill, reset: reset, sensor: sensor
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function status(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

  //var deadman = require('../../../server.js');
  //var value = deadman.getAlive();
  var result;
  var get = require('simple-get');
  get.concat('http://localhost:8080/alive', function (err, stream, data) {
	if( err ) throw err;
	var value = false;
	console.log(stream.statusCode);
	console.log(data);
	if( data == 'true' ) value = true;
        if( value ){
	  result = util.format('Online');
  	} else {
	  result = util.format('Offline');
	}
	console.log('result: ' + result);

	// this sends back a JSON response which is a single string
	res.json(result);
  });

}

function kill(req, res) {
	var status = util.format('Killed');
	
	res.json(status);
}

function reset(req, res) {
	var status = util.format('Reset');
	
	res.json(status);
}

function sensor(req, res) {
	var sensor = req.swagger.params.name.value || '';
	sensor = sensor.toLowerCase();
	
	var value = 0;
	
	var board = new Board({
		onError: function(err){
			console.log(err);
		}
	});
	board.init();

	if( sensor == 'light' ){
		var LightAnalogSensor = GrovePi.sensors.LightAnalog;
		var lightSensor = new LightAnalogSensor(2);
		value = lightSensor.read();
		var data = util.format('Light: ', value);
	} else if ( sensor == 'vibration' ){
		var data = util.format('Vibration: ', value);
	} else if ( sensor == 'button' ){
		var data = util.format('Button: ', value);
	} else {
		res.status(400);
		var data = util.format('Sensor name incorrect');
	}	
	
	res.json(data);
}