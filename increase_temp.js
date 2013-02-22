 var arduino = require('duino'),
    down = "07",
	up = "08",
	ok = "09";
	alarmHour = 10;
	alarmMinute = 40,
	interval = 0,
	currentTemperature = 0,
	// desiredTemperature=110,
	board=0;


function initArduino(startingTemp, callback){
	board = new arduino.Board({
    	debug: true
    })
    currentTemperature = startingTemp;
    board.on('ready', function(){
    	callback();
	});
}

function checkTime(){
	var date = new Date();
	// console.log(date.getMinutes());
	if((date.getHours()>=alarmHour) && (date.getMinutes()>=alarmMinute)){
		console.log("wakeup!");
		setTemp(desiredTemperature);
		clearInterval(interval);
	}
}

function setTemp(setPoint){
	if(setPoint > currentTemperature){
		stepTempXTimes(0,setPoint-currentTemperature,up);	
	}else if(setPoint < currentTemperature){
		stepTempXTimes(0,currentTemperature - setPoint,down);	
	}else{
		console.log("done!");
	}
	currentTemperature = setPoint;
}

function stepTemp(pin){
	board.write("!"+pin+".");
	// setTimeout(function(){board.pinMode(pin, 'in')}, 150);
}

function stepTempXTimes(times_stepped,desired_steps,pin){
	if(times_stepped!==desired_steps+1){ //need an extra step to turn on the display
		console.log(times_stepped);
		setTimeout(stepAndSetTimeout(times_stepped,desired_steps,pin),500);	
	}else{
		setTimeout(submitTemperature,500);
	}
}

function submitTemperature(){
	stepTemp(ok);
}

function stepAndSetTimeout(times_stepped,desired_steps,pin){
	return function(){stepTemp(pin);stepTempXTimes(times_stepped+1,desired_steps,pin)};
}

//green=ok
//red=up 
//yellow= down
exports.setTemp =  setTemp;
exports.initArduino = initArduino;
