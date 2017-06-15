var KEY_LEFT_ARROW = 37;
var KEY_UP_ARROW = 38;
var KEY_RIGHT_ARROW = 39;
var KEY_DOWN_ARROW = 40;
var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;

var TILE = 20;
var TILES = 25;

var myTimer;

var canvas = document.getElementById('can');
var c = canvas.getContext('2d');

document.addEventListener('keydown', keyPressed);

var score = 0;

var snake = {
	x: 0,
	y: 0,
	dx: 0,
	dy: 0,

	trail: [],
	tail: 1,
	
	move: function() {
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
		
		if (this.x > TILES - 1) {
			this.x = 0;
		}
		else if (this.x < 0) {
			this.x = TILES - 1;
		}
		else if (this.y > TILES - 1) {
			this.y = 0;
		}
		else if (this.y < 0) {
			this.y = TILES - 1;
		}
		
		this.trail.push({x: this.x, y: this.y});
		while (this.trail.length > this.tail) {
			this.trail.shift();
		}
	},
	
	init: function() {
		this.x = 12;
		this.y = 12;
		this.dx = 0;
		this.dy = 0;
		this.trail = [];
		this.tail = 1;
	},
	
	draw: function() {
		c.fillStyle = "white";
		for (let i=0; i<snake.trail.length; i++) {
			c.fillRect(snake.trail[i].x*TILE+1, snake.trail[i].y*TILE+1, TILE-2, TILE-2);
		}
		c.fillStyle = "yellow";
		c.fillRect(snake.x*TILE+1, snake.y*TILE+1, TILE-2, TILE-2);
	}
};

var apple = {
	x: 0,
	y: 0,
	
	getRandomPosition: function() {
		this.x = Math.floor(Math.random()*TILES);
		this.y = Math.floor(Math.random()*TILES);
	},
	
	draw: function() {
		c.fillStyle = "crimson";
		c.fillRect(this.x*TILE+1, this.y*TILE+1, TILE-2, TILE-2);
	}
};

function initialization() {
	score = 0;
	apple.getRandomPosition();
	snake.init();
	drawBackground();
	myTimer = setInterval(game, 1000/16);
}

function game() {

	snake.move();
	checkGameOver();
	
	if (snake.x == apple.x && snake.y == apple.y) {
		snake.tail++;
		score++;
		while(isAppleInSnakeTrail()) {
			apple.getRandomPosition();
		}
	}
	
	drawBackground();
	apple.draw();
	snake.draw();
	
	updateScore()
}

function drawBackground() {
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
}

function isAppleInSnakeTrail() {
	var flag = 0;
	for (let i=0; i<snake.trail.length; i++) {
		if(apple.x == snake.trail[i].x && apple.y == snake.trail[i].y) {
			flag++;
		}
	}
	return flag;
}

function checkGameOver() {
	var test = 0;
	for (let i=0; i<snake.trail.length; i++) {
		if(snake.x == snake.trail[i].x && snake.y == snake.trail[i].y) {
			test++;
		}
	}
	if (test > 1) {
		clearInterval(myTimer);
		setTimeout('drawBackground()', 0);
		setTimeout('apple.draw()', 0);
		setTimeout('snake.draw()', 400);
		setTimeout('drawBackground()', 800);
		setTimeout('apple.draw()', 800);
		setTimeout('snake.draw()', 1200);
		setTimeout('drawBackground()', 1600);
		setTimeout('apple.draw()', 1600);
		setTimeout('snake.draw()', 2000);
		setTimeout('drawBackground()', 2400);
		setTimeout('apple.draw()', 2400);
		setTimeout('snake.draw()', 2800);
		setTimeout('initialization()', 5000);
	}
}

function keyPressed(event) {
	switch(event.keyCode) {
		case KEY_LEFT_ARROW:
		case KEY_A:
			if(snake.dx != 1) {
				snake.dx = -1;
				snake.dy = 0;
			}
			break;
		case KEY_UP_ARROW:
		case KEY_W:
			if(snake.dy != 1) {
				snake.dx = 0;
				snake.dy = -1;
			}
			break;
		case KEY_RIGHT_ARROW:
		case KEY_D:
			if(snake.dx != -1) {
				snake.dx = 1;
				snake.dy = 0;
			}
			break;
		case KEY_DOWN_ARROW:
		case KEY_S:
			if(snake.dy != -1) {
				snake.dx = 0;
				snake.dy = 1;
			}
			break;
	}
}

function updateScore() {
	var div = document.getElementById('snake-container-score');
	var stringScore = 'Score: ' + score;
	div.textContent = stringScore;
}

// ===== START GAME ===================================

initialization();
