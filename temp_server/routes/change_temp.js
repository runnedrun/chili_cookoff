// lookup.put("0", "Headband_removed");
// lookup.put("1", "Wake");
// 	     lookup.put("2", "Rem");
// 	     lookup.put("3", "Light");
// 	     lookup.put("4", "Deep");
// 	     lookup.put("5", "Waiting for headband");


tempSetter = require("../increase_temp.js")
tempSetter.initArduino(70,function(){console.log("aruidino is ready!")});

exports.change_temp = function(req,res){
	console.log(req.body);
	console.log(req.query);
	sleep_cycle = req.query.value;


	rem_temp = 85;
	normal_temp = 70;

	if(sleep_cycle==="2"){
		console.log("rem sleep, turning up the temp")
		tempSetter.setTemp(rem_temp, function(){console.log("done setting temp")});
		res.send("temp changed");
	}else{
		tempSetter.setTemp(normal_temp, function(){console.log("done setting temp")});
		res.send("temp changed")
	}
}