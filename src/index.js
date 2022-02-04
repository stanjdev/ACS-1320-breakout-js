/* eslint-disable import/extensions */
import Ball from './classes/Ball.js';
import Paddle from './classes/Paddle.js';
import Background from './classes/Background.js';
import GameLabel from './classes/GameLabel.js';
import Game from './classes/Game.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(200, 200, 10);

const paddleHeight = 10;
const paddleWidth = 75;
const paddle = new Paddle(
  (canvas.width - paddleWidth) / 2,
  canvas.height - paddleHeight,
  paddleWidth,
  paddleHeight,
);

const score = new GameLabel('score', 0, 8, 20);
score.reset();

const lives = new GameLabel('lives', 3, canvas.width - 65, 20);
lives.reset();

const level = new GameLabel('level', 1, canvas.width / 2.2, 20);

function mouseMoveHandler(evt) {
  const relativeX = evt.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
}

const background = new Background(canvas.width, canvas.height);

const game = new Game(
  ball,
  paddle,
  level,
  score,
  lives,
  ctx,
  canvas.width,
  canvas.height,
  background,
  canvas,
);

function keyDownHandler(evt) {
  if (evt.key === 'Right' || evt.key === 'ArrowRight') {
    game.rightPressed = true;
  } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
    game.leftPressed = true;
  }
}

function keyUpHandler(evt) {
  if (evt.key === 'Right' || evt.key === 'ArrowRight') {
    game.rightPressed = false;
  } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
    game.leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function checkKeys() {
  if (game.rightPressed === true) {
    paddle.x += 7;
    if (paddle.x + paddleWidth > canvas.width) {
      paddle.x = canvas.width - paddleWidth;
    }
  } else if (game.leftPressed) {
    paddle.x -= 7;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  game.drawBricks();
  game.collisionDetection();

  ball.move();
  ball.render(ctx);

  paddle.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  level.render(ctx);

  // BALL BOUNDARIES
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      ball.color = game.randomColor();
      background.color = game.randomColor();
      paddle.color = game.randomColor();
      score.color = game.randomColor();
      lives.color = game.randomColor();
      level.color = game.randomColor();
      ball.dy = -ball.dy;
    } else {
      lives.update();
      if (!lives.numberValue) {
        // alert('GAME OVER');
        document.location.reload();
      } else {
        game.initGame();
      }
    }
  }

  // Check for left, right arrow keys pressed
  checkKeys();

  requestAnimationFrame(draw);
}

draw();
