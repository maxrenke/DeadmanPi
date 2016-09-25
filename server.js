var http = require('http');
var dispatcher = require('httpdispatcher');
var fs = require('fs');

const PORT = 8080;

var alive = true;

function handleRequest(request, response){
	try{
		console.log(request.url);
		dispatcher.dispatch(request,response);
	} catch(err) {
		console.log(err);
	}
}

var server = http.createServer(handleRequest);

var files = [];

getFiles();

server.listen(PORT, function(){
	console.log("Server listening on localhost:%s", PORT);
});

dispatcher.setStatic('resources');

function getFiles(){
	fs.readdir("/home/pi/DeadmanPi/files/", function(err,items) {
		try{
			console.log("items: " + items);
			for(var i=0; i<items.length; i++){
				files[i] = items[i];
			}
		} catch (err) {
			files = [];
		}
	});
}

function removeFiles(files){
	for(var i=0; i<files.length; i++){
		try{
			console.log('delete: ' + files[i]);
			fs.unlinkSync("/home/pi/DeadmanPi/files/" + files[i]);
		} catch(err) {
			//don't handle
		}
	}
	files = [];
}

function homePage(req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html>\n<body>');
	res.write('<h1>Deadman Server</h1>');
	res.write('<h3 id="online">');
	if( alive ){
		res.write('ONLINE');
	} else {
		res.write('OFFLINE');
		removeFiles(files);
	}
	res.write('</h3>');
	console.log("files: " + files);
	/*for(var i=0; i<files.length; i++){
		res.write('<b>' + files[i] + '</b><br>');
	}*/
	res.write('<iframe src="http://localhost:5000" width="100%" height="100%"></iframe>');
	res.write('</body></html>');
	res.end();
}

dispatcher.onGet("/", function(req,res) {
	getFiles();
	homePage(req,res);
});

dispatcher.onPost("/kill", function(req, res) {
	console.log("kill!");
	alive = false;
	removeFiles(files);
	files = [];
	res.end("Killed (Server)");
});

dispatcher.onPost("/reset", function(req,res) {
	alive = true;
	getFiles();
	res.end("Reset (Server)");
});