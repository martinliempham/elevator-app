/**PLANNING*/

//we need to import elevator and passanger classes

//create 3 passangers with names and floors, array

//elevator class
	//should extend event emitter class
	//params: currentPassanger,
	//methods: loadPassanger, unloadPassanger, goUp, goDown
		//1 second delay between floors
	//respond to "up" and "down"

//passanger class
	//params: name, desiredFloor

/**CODING*/

var Passenger = require('./passenger.js');
//native module
var EventEmitter = require('events');

// console.log(new Passenger('hello', 4));
var Martin = new Passenger('Martin ', 5);
var Lester = new Passenger('Lester ', 8);
var Nate =	new Passenger('Nate ', 3);

var passengers = [
	Martin,
	Lester,
	Nate
];

// var passengers = [
// 	new Passenger('Martin', 5),
// 	new Passenger('Lester', 8),
// 	new Passenger('Nate', 3),
// ];

function Elevator(currentPassenger, currentFloor){
	//set a default with OR||
	this.currentPassenger = currentPassenger || {}; 
	
	this.currentFloor = currentFloor || 0;

}
Elevator.prototype = new EventEmitter();

Elevator.prototype.loadPassenger = function(passenger){
	console.log(`Loading passenger ${passenger.name}at floor ${this.currentFloor}`);
	this.currentPassenger = passenger;
	this.emit('up');
};
Elevator.prototype.unloadPassenger = function(){
	console.log(`Unloading passenger ${this.currentPassenger.name}at floor ${this.currentFloor}`);
	this.currentPassenger = {};
	this.emit('down');
};
Elevator.prototype.goUp = function(){
	console.log(`Elevator taking ${this.currentPassenger.name} up, currently at floor ${this.currentFloor}`);
	this.currentFloor++;
};
Elevator.prototype.goDown = function(){
	console.log(`Elevator going down currently at floor ${this.currentFloor}`);
	this.currentFloor--;
};

var elevator = new Elevator();

// console.log(elevator)


elevator.on('up',function(){
	setTimeout(function(){


			//keep going up until we reach the desired floor
			if(this.currentFloor === this.currentPassenger.desiredFloor){
				//unload passenger
				this.unloadPassenger();
			}else{
				this.goUp();
				this.emit('up');
			}
		//everytime, we go up a floor we check if it is the desired floor
			//unload passenger
			//if not desired floor, keep going up
		}.bind(this),1000);
	});
		elevator.on('down',function(){
			setTimeout(function(){
			//keep going down until we reach the lobby
			if(this.currentFloor!==0){
				this.goDown();
				this.emit('down');
			}else{
				var nextPassenger = passengers.pop();
				if(nextPassenger) {
					this.loadPassenger(nextPassenger);

				}else{
					console.log('No more passengers. We are back at floor ' + this.currentFloor);
				}
			};
		}.bind(this),1000);
// elevator.emit('up');
});
elevator.loadPassenger(passengers.pop());




