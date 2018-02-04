var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var canvasX = width / 2;
var canvasY = height / 2;
var fps = 1000;
var init = false;


// Seconds
var seconds = new Date().getSeconds() + 1;
var secondsColor = randomColor();
var distanceSeconds = 32;
var angleSeconds = 4.61 + (seconds * .10475);
var radiusSeconds = 305.7;
var sizeSeconds = 15;


// Minutes
var minutes = new Date().getMinutes();
var minutesColor = randomColor();
var distanceMinutes = 51.22;
var angleMinutes = 4.71 + (minutes * .10475);
var radiusMinutes = 245;
var sizeMinutes = 25;


// Hours
var hour = new Date().getHours();
var hours = hour > 12 ? hour - 12 : hour;
var hoursColor = randomColor();
var distanceHours = 84;
var angleHours = 4.71 + (hours * .471);
var radiusHours = 162.3;
var sizeHours = 40;

var time = hours + ':' + minutes;
var x = canvasX - (ctx.measureText(time).width / 2);
var y = canvasY - 25;

function randomColor() {
	var r = 255 * Math.random() | 0,
		g = 255 * Math.random() | 0,
		b = 255 * Math.random() | 0;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function counter() {
	seconds = seconds !== 59 ? seconds + 1 : seconds = 0;
	if (seconds === 0) {
		minutes = minutes !== 59 ? minutes + 1 : minutes = 0;
	}

	if (minutes === 0 && seconds === 0) {
		hours = hours !== 12 ? hours + 1 : hours = 1;
	}

}

function drawSeconds(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	secondsColor = randomColor();
	ctx.fillStyle = secondsColor;
	ctx.strokeStyle = 'white';
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, sizeSeconds, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
	ctx.font = "15px Courier New";
	ctx.fillStyle = "white";
	seconds < 10 ? ctx.fillText(seconds, x - 6.5, y + 4.5) : ctx.fillText(seconds, x - 9.5, y + 4.5);
	ctx.restore();
}

function drawMinutes(x, y) {
	if (seconds === 0) {
		minutesColor = randomColor();
	}
	ctx.fillStyle = minutesColor;
	ctx.strokeStyle = 'white';
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, sizeMinutes, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
	ctx.font = "25px Courier New";
	ctx.fillStyle = "white";
	minutes < 10 ? ctx.fillText(minutes, x - 8, y + 8) : ctx.fillText(minutes, x - 15.5, y + 8);
	ctx.restore();
}

function drawHours(x, y) {
	if (minutes === 0 && seconds === 0) {
		hoursColor = randomColor();
	}
	var timeHours;
	if (hours > 12) {
		timeHours = hours - 12;
	} else if (hours = 0) {
		timeHours = 12;
	} else {
		timeHours = 12;
	}
	ctx.fillStyle = hoursColor;
	ctx.strokeStyle = 'white';
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, sizeHours, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
	ctx.font = "45px Courier New";
	ctx.fillStyle = "white";
	timeHours < 10 ? ctx.fillText(timeHours, x - 14.5, y + 14) : ctx.fillText(timeHours, x - 27.5, y + 14);
	ctx.restore();
}

function drawTime() {
	var timeHours;
	if (hours > 12) {
		timeHours = hours - 12;
	} else if (hours = 0) {
		timeHours = 12;
	} else {
		timeHours = 12;
	}

	timeMinutes = minutes < 10 ? '0' + minutes : minutes;
	displayTime = timeHours + ':' + timeMinutes;
	ctx.stroke();
	ctx.font = "50px Courier New";
	ctx.fillStyle = "black";
	ctx.fillText(displayTime, x, y);
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

		if (seconds === 0 && minutes % 2 === 0 && init === true) {
			angleMinutes += Math.acos(1 - Math.pow(distanceMinutes / radiusMinutes, 2) / 2);
			var minutesX = canvasX + radiusMinutes * Math.cos(angleMinutes);
			var minutesY = canvasY + radiusMinutes * Math.sin(angleMinutes);
		} else {
			var minutesX = canvasX + radiusMinutes * Math.cos(angleMinutes);
			var minutesY = canvasY + radiusMinutes * Math.sin(angleMinutes);
		}

		if (minutes === 0 && seconds === 0 && init === true) {
			angleHours += Math.acos(1 - Math.pow(distanceHours / radiusHours, 2) / 2);
			var hoursX = canvasX + radiusHours * Math.cos(angleHours);
			var hoursY = canvasY + radiusHours * Math.sin(angleHours);
		} else {
			var hoursX = canvasX + radiusHours * Math.cos(angleHours);
			var hoursY = canvasY + radiusHours * Math.sin(angleHours);
		}

		init = true;
		drawSeconds(secondsX, secondsY);
		drawMinutes(minutesX, minutesY);
		drawHours(hoursX, hoursY);
		drawTime();
		ctx.beginPath();
		ctx.closePath();
		ctx.stroke();
		counter();
	}, fps);
}

animate();