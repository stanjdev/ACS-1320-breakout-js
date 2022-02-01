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
    for (let i = 0; i < this.brickRowCount * this.brickColumnCount; i += 1) {
      const row = Math.floor(i / this.brickColumnCount);
      this.bricks[i] = new Brick(0, 0, undefined, undefined, row % 2 === 0 ? 'orange' : 'crimson');
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
    for (let i = 0; i < this.bricks.length; i += 1) {
      const c = i % this.brickColumnCount;
      const r = Math.floor(i / this.brickColumnCount);
      if (this.bricks[i].status === true) {
        const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[i].x = brickX;
        this.bricks[i].y = brickY;
        this.bricks[i].render(this.ctx);
      }
    }
  }

  randomColor() {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += hex[Math.floor(Math.random() * hex.length)];
    }
    return color;
  }

  collisionDetection() {
    for (let i = 0; i < this.bricks.length; i += 1) {
      const b = this.bricks[i];
      if (b.status === true) {
        if (this.ball.x > b.x && this.ball.x < b.x + b.width && this.ball.y > b.y && this.ball.y < b.y + b.height) {
          this.ball.dy = -this.ball.dy;
          this.ball.color = this.randomColor();
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

export default Game;
