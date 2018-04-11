var r = require("../utils/runtime");

function shuttleInfoHandler(req,res){
	/*try{
		req.body = JSON.parse(req.body);
	} catch(e){
		res.sendJson(500,{
			code: 500,
			message: "Failed to parse the input"
		});
		return;		
	}*/

	
	
		r.getRuntimeKey("db").mongo.users.find().toArray(function(err,item){
			if(err || item.length == 0){
				res.sendJson(400, {
					code: 400,
					message : "Shuttle time not available"
				});
			}else {
				/*
					item = {
						'time': '20 mins'
					}
				*/
				res.sendJson(200,{
					code: 200,
					data: {
						'time': item[0].shuttleTime
					}
				});
			}
		});
	
	
}

module.exports = {
	time: shuttleInfoHandler
}