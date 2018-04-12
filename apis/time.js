var r = require("../utils/runtime");

function shuttleInfoHandler(req,res){	
		r.getRuntimeKey("db").mongo.WaitingTime.find({name:"admin"}).toArray(function(err,item){
			if(err || item.length == 0){
				res.sendJson(400, {
					code: 400,
					message : "Shuttle time not available"
				});
			}else {
				var resp = {
					speech: "Shuttle is available in " + item[0].waitTime,
					displayText: "Shuttle is available in " + item[0].waitTime
				};
				res.sendJson(200, resp);
			}
		});	
}

module.exports = {
	time: shuttleInfoHandler
}
