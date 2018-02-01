var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var distance = 3;
var angle = 0;
var canvasX = 250;
var canvasY = 200;
var radius = 10;
var size;
var fps = 100;

function randomColor() {
	var r = 255 * Math.random() | 0,
		g = 255 * Math.random() | 0,
		b = 255 * Math.random() | 0;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function draw(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var color = randomColor();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.save();
	ctx.beginPath();
	ctx.arc(x - 1, y - 1 / 2, size, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.stroke();
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
		angle += Math.acos(1 - Math.pow(distance / radius, 2) / 2);
		var newX = canvasX + radius * Math.cos(angle);
		var newY = canvasY + radius * Math.sin(angle);
		draw(newX, newY);
		ctx.beginPath();
		ctx.closePath();
		ctx.stroke();
	}, fps);
}

animate();