tempSetter = require("../increase_temp.js")
tempSetter.initArduino(71,function(){console.log("aruidino is ready!")});

exports.change_temp = function(req,res){
	console.log(req.body);
	tempSetter.setTemp(req.body.temp, function(){console.log("done setting temp");res.send("temp changed")});
}