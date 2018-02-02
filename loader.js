var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var canvasX = 400;
var canvasY = 400;
var fps = 250;


// Seconds
var distanceSeconds = 32;
var angleSeconds = 4.7;
var radiusSeconds = 305.8;
var sizeSeconds = 15;
var seconds = 1;

// Minutes
var distanceMinutes = 33;
var angleMinutes = 4.70;
var radiusMinutes = 158;
var sizeMinutes = 15;
var minutes = 1;

// Hours
var distanceHours = 42;
var angleHours = 4.7;
var radiusHours = 81;
var sizeHours = 20;
var hours = 1;



function randomColor() {
	var r = 255 * Math.random() | 0,
		g = 255 * Math.random() | 0,
		b = 255 * Math.random() | 0;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function drawSeconds(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var color = randomColor();
	ctx.fillStyle = color;
	ctx.strokeStyle = 'white';
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, sizeSeconds, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	seconds < 10 ? ctx.fillText(seconds ,x - 5.5,y + 5) : ctx.fillText(seconds ,x - 9.5,y + 5);
	seconds = seconds < 60 ? seconds + 1 : seconds = 1;
	ctx.restore();
}


function drawMinutes(x, y) {

	var color = randomColor();
	ctx.fillStyle = color;
	ctx.strokeStyle = 'white';
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, sizeMinutes, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	minutes < 10 ? ctx.fillText(minutes ,x - 5.5,y + 5) : ctx.fillText(minutes ,x - 9.5,y + 5);
	minutes = minutes < 60 ? minutes + 1 : minutes = 1;
	ctx.restore();
}

function drawHours(x, y) {

	var color = randomColor();
	ctx.fillStyle = color;
	ctx.strokeStyle = 'white';
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, sizeHours, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
	ctx.font = "15px Arial";
	ctx.fillStyle = "white";
	hours < 10 ? ctx.fillText(hours ,x - 5.5,y + 5) : ctx.fillText(hours ,x - 9.5,y + 5);
	hours = hours < 12 ? hours + 1 : hours = 1;

//     ctx.strokeStyle = 'black';
//     ctx.beginPath();
//     ctx.moveTo(400, 0);
//     ctx.lineTo(400, 800);
//     ctx.stroke();

	ctx.restore();


}


window.requestAnimFrame = (function (callback) {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, fps);
		};
})();

function animate() {
	setTimeout(function () {
		requestAnimFrame(animate);

		angleSeconds += Math.acos(1 - Math.pow(distanceSeconds / radiusSeconds, 2) / 2);
		var secondsX = canvasX + radiusSeconds * Math.cos(angleSeconds);
		var secondsY = canvasY + radiusSeconds * Math.sin(angleSeconds);

		angleMinutes += Math.acos(1 - Math.pow(distanceMinutes / radiusMinutes, 2) / 2);
		var minutesX = canvasX + radiusMinutes * Math.cos(angleMinutes);
		var minutesY = canvasY + radiusMinutes * Math.sin(angleMinutes);


		angleHours += Math.acos(1 - Math.pow(distanceHours / radiusHours, 2) / 2);
		var hoursX = canvasX + radiusHours * Math.cos(angleHours);
		var hoursY = canvasY + radiusHours * Math.sin(angleHours);

		drawSeconds(secondsX, secondsY);
		drawMinutes(minutesX, minutesY);
		drawHours(hoursX, hoursY);

		ctx.beginPath();
		ctx.closePath();
		ctx.stroke();
	}, fps);
}

animate();