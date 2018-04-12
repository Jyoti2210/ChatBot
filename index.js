var http = require('http');
var route = require("./routes/route");
var dispatcher1 = require('httpdispatcher');
var dispatcher = new dispatcher1();
var MongoClient = require('mongodb').MongoClient;

const port = process.argv[2] || 3000;
// const url = "mongodb://localhost:27017";
const url = "mongodb://54.69.83.63:27017";
const dbName = "SUShuttle";
var runtime = require("./utils/runtime");

init();

function init(){
	console.log("starting on port:",port);
	MongoClient.connect(url,function(err,client){
		if (err) {
			console.log("Connection to remote DB failed. Message: ", err);
		} else {
			console.log("Connected to Database");
			var obj = {
				mongo:{
					WaitingTime: client.db(dbName).collection("WaitingTime")
				}
			};
			runtime.setRuntime("db",obj);
		}
	});
}

function sendJson(code, obj){
	var resp = JSON.stringify(obj);
	this.writeHeader(code, {"Content-Type" : "application/json"});
	console.log(resp,code);
	this.end(resp);
}

function handler(request,response){
	response.sendJson = sendJson;
	dispatcher.dispatch(request,response);
}

var server = http.createServer(handler);

dispatcher.onPost("/apis/time", route.shuttleTime.time);

server.listen(port);
