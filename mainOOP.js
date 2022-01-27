/* eslint-disable import/extensions */
import Brick from './classes/Brick.js';
import Ball from './classes/Ball.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// const ballRadius = 10;

let ballSpeed = 2;

const paddleHeight = 10;
const paddleWidth = 75;
let rightPressed = false;
let leftPressed = false;

let score = 0;
let lives = 3;
let level = 1;

let brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = ballSpeed;
// let dy = -ballSpeed;
let paddleX = (canvas.width - paddleWidth) / 2;

const initGame = (ball) => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = ballSpeed;
  ball.dy = -ballSpeed;
  paddleX = (canvas.width - paddleWidth) / 2;
};

function incrementSettings() {
  level += 1;
  ballSpeed += 1;
  brickRowCount += 1;
  // if (brickRowCount === 5) {
  //   brickRowCount = 3;
  // }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawLevel() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0035DD';
  ctx.fillText(`Level: ${level}`, canvas.width / 2.2, 20);
}

// Nested arrays
const bricks = [];
let currentBricks = brickRowCount * brickColumnCount;

function initBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r] = new Brick(0, 0);
    }
  }
  currentBricks = brickRowCount * brickColumnCount;
}

initBricks();

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === true) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        bricks[c][r].render(ctx);
      }
    }
  }
}

function keyDownHandler(evt) {
  if (evt.key === 'Right' || evt.key === 'ArrowRight') {
    rightPressed = true;
  } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(evt) {
  if (evt.key === 'Right' || evt.key === 'ArrowRight') {
    rightPressed = false;
  } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(evt) {
  const relativeX = evt.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection(ball) {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === true) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          currentBricks -= 1;
          console.log(`score: ${score}, current bricks: ${currentBricks}`);
          score += 1;
          b.status = false;
          if (currentBricks === 0) {
            // alert('YOU WIN, CONGRATULATIONS!');
            // document.location.reload();
            incrementSettings();
            initGame(ball);
            initBricks();
          }
        }
      }
    }
  }
}

const ball = new Ball(200, 200, 10);

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//   ctx.fillStyle = '#0095DD';
//   ctx.fill();
//   ctx.closePath();
// }

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0055DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();

  // drawBall();
  ball.move();
  ball.render(ctx);

  drawPaddle();
  drawScore();
  drawLives();
  drawLevel();
  collisionDetection(ball);

  // BALL BOUNDARIES
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        initGame(ball);
      }
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  // ball moving
  // x += dx;
  // y += dy;

  requestAnimationFrame(draw);
}

// let interval = setInterval(draw, 10);
draw();
