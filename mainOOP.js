/* eslint-disable import/extensions */
import Ball from './classes/Ball.js';
import Paddle from './classes/Paddle.js';
import Background from './classes/Background.js';
import Score from './classes/Score.js';
import Lives from './classes/Lives.js';
import Level from './classes/Level.js';
import Game from './classes/Game.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(200, 200, 10);

const paddleHeight = 10;
const paddleWidth = 75;
const paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - paddleHeight, paddleWidth, paddleHeight);

const level = new Level(1, canvas.width / 2.2, 20, '#0095DD');

const score = new Score();
score.reset();

const lives = new Lives(3, canvas.width - 65, 20, '#0095DD');
lives.reset();

function mouseMoveHandler(evt) {
  const relativeX = evt.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
}

const background = new Background(canvas.width, canvas.height);

const game = new Game(ball, paddle, level, score, lives, ctx, canvas.width, canvas.height, background, canvas);

document.addEventListener('keydown', game.keyDownHandler, false);
document.addEventListener('keyup', game.keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

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
      ball.dy = -ball.dy;
    } else {
      lives.loseLife();
      if (!lives.lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        game.initGame();
      }
    }
  }

  if (game.rightPressed) {
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
  requestAnimationFrame(draw);
}

draw();