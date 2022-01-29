/* eslint-disable import/extensions */
import Brick from './classes/Brick.js';
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

let brickRowCount = 3;
const brickColumnCount = 5;
// const brickWidth = 75;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;

// function incrementSettings() {
//   level.updateLevel();
//   ball.increaseSpeed();
//   brickRowCount += 1;
//   // if (brickRowCount === 5) {
//   //   brickRowCount = 3;
//   // }
// }

// Create the initial bricks array
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

// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === true) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         bricks[c][r].render(ctx);
//       }
//     }
//   }
// }

// function keyDownHandler(evt) {
//   if (evt.key === 'Right' || evt.key === 'ArrowRight') {
//     rightPressed = true;
//   } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
//     leftPressed = true;
//   }
// }

// function keyUpHandler(evt) {
//   if (evt.key === 'Right' || evt.key === 'ArrowRight') {
//     rightPressed = false;
//   } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
//     leftPressed = false;
//   }
// }

// function mouseMoveHandler(evt) {
//   const relativeX = evt.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     paddle.x = relativeX - paddleWidth / 2;
//   }
// }

const background = new Background(canvas.width, canvas.height);

const game = new Game(ball, bricks, paddle, level, score, lives, ctx, canvas.width, canvas.height, background, currentBricks, initBricks, canvas);

document.addEventListener('keydown', game.keyDownHandler, false);
document.addEventListener('keyup', game.keyUpHandler, false);
document.addEventListener('mousemove', game.mouseMoveHandler, false);

// function collisionDetection() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       const b = bricks[c][r];
//       if (b.status === true) {
//         if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
//           ball.dy = -ball.dy;
//           currentBricks -= 1;
//           // console.log(`score: ${score.score}, current bricks: ${currentBricks}`);
//           score.update(1);
//           b.status = false;
//           if (currentBricks === 0) {
//             // alert('YOU WIN, CONGRATULATIONS!');
//             // document.location.reload();
//             incrementSettings();
//             initGame();
//             initBricks();
//           }
//         }
//       }
//     }
//   }
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   background.render(ctx);
//   drawBricks();

//   ball.move();
//   ball.render(ctx);

//   paddle.render(ctx);
//   score.render(ctx);
//   lives.render(ctx);
//   level.render(ctx);
//   collisionDetection();

//   // BALL BOUNDARIES
//   if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
//     ball.dx = -ball.dx;
//   }
//   if (ball.y + ball.dy < ball.radius) {
//     ball.dy = -ball.dy;
//   } else if (ball.y + ball.dy > canvas.height - ball.radius) {
//     if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
//       ball.dy = -ball.dy;
//     } else {
//       lives.loseLife();
//       if (!lives.lives) {
//         alert('GAME OVER');
//         document.location.reload();
//       } else {
//         initGame();
//       }
//     }
//   }

//   if (rightPressed) {
//     paddle.x += 7;
//     if (paddle.x + paddleWidth > canvas.width) {
//       paddle.x = canvas.width - paddleWidth;
//     }
//   } else if (leftPressed) {
//     paddle.x -= 7;
//     if (paddle.x < 0) {
//       paddle.x = 0;
//     }
//   }
//   requestAnimationFrame(draw);
// }

// let interval = setInterval(draw, 10);
game.draw();
