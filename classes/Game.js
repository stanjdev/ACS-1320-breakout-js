class Game {
  constructor(ball, bricks, paddle, level, score, lives, ctx, width, height, background, currentBricks, initBricks, canvas) {
    this.ball = ball;
    this.bricks = bricks;
    this.paddle = paddle;
    this.level = level;
    this.score = score;
    this.lives = lives;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.background = background;
    this.currentBricks = currentBricks;
    this.initBricks = initBricks;
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

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.background.render(this.ctx);
    this.drawBricks();

    this.ball.move();
    this.ball.render(this.ctx);

    this.paddle.render(this.ctx);
    this.score.render(this.ctx);
    this.lives.render(this.ctx);
    this.level.render(this.ctx);
    this.collisionDetection();

    // BALL BOUNDARIES
    if (this.ball.x + this.ball.dx > this.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives.loseLife();
        if (!this.lives.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.initGame();
        }
      }
    }

    if (this.rightPressed) {
      this.paddle.x += 7;
      if (this.paddle.x + this.paddle.width > this.width) {
        this.paddle.x = this.width - this.paddle.width;
      }
    } else if (this.leftPressed) {
      this.paddle.x -= 7;
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }
    }
    requestAnimationFrame(this.draw);
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const b = this.bricks[c][r];
        if (b.status === true) {
          if (this.ball.x > b.x && this.ball.x < b.x + b.width && this.ball.y > b.y && this.ball.y < b.y + b.height) {
            this.ball.dy = -this.ball.dy;
            this.currentBricks -= 1;
            // console.log(`score: ${score.score}, current bricks: ${this.currentBricks}`);
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

  mouseMoveHandler(evt) {
    const relativeX = evt.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }
}

export default Game;
