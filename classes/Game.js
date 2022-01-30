/* eslint-disable import/extensions */
import Brick from './Brick.js';

class Game {
  constructor(ball, paddle, level, score, lives, ctx, width, height, background, canvas) {
    this.ball = ball;
    this.bricks = [];
    this.paddle = paddle;
    this.level = level;
    this.score = score;
    this.lives = lives;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.background = background;
    this.currentBricks = 0;
    this.canvas = canvas;
    this.rightPressed = false;
    this.leftPressed = false;
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.initBricks();
  }

  initBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        this.bricks[c][r] = new Brick(0, 0);
      }
    }
    this.currentBricks = this.brickRowCount * this.brickColumnCount;
  }

  initGame() {
    this.ball.x = this.width / 2;
    this.ball.y = this.height - 30;
    this.ball.dx = this.ball.ballSpeed;
    this.ball.dy = -this.ball.ballSpeed;
    this.paddle.x = (this.width - this.paddle.width) / 2;
  }

  incrementSettings() {
    this.level.updateLevel();
    this.ball.increaseSpeed();
    this.brickRowCount += 1;
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === true) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.bricks[c][r].render(this.ctx);
        }
      }
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const b = this.bricks[c][r];
        if (b.status === true) {
          if (this.ball.x > b.x && this.ball.x < b.x + b.width && this.ball.y > b.y && this.ball.y < b.y + b.height) {
            this.ball.dy = -this.ball.dy;
            this.currentBricks -= 1;
            this.score.update(1);
            b.status = false;
            if (this.currentBricks === 0) {
              // alert('YOU WIN, CONGRATULATIONS!');
              // document.location.reload();
              this.incrementSettings();
              this.initGame();
              this.initBricks();
            }
          }
        }
      }
    }
  }

  keyDownHandler(evt) {
    if (evt.key === 'Right' || evt.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(evt) {
    if (evt.key === 'Right' || evt.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }
}

export default Game;
