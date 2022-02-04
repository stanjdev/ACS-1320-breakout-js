/* eslint-disable import/extensions */
import Bricks from './Bricks.js';

class Game {
  constructor(ball, paddle, level, score, lives, ctx, width, height, background, canvas) {
    this.ball = ball;
    this.bricks = new Bricks(3, 5);
    this.paddle = paddle;
    this.level = level;
    this.score = score;
    this.lives = lives;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.background = background;
    this.canvas = canvas;
    this.rightPressed = false;
    this.leftPressed = false;
    this.bricks.setup();
  }

  initGame() {
    this.ball.x = this.width / 2;
    this.ball.y = this.height - 30;
    this.ball.dx = this.ball.ballSpeed;
    this.ball.dy = -this.ball.ballSpeed;
    this.paddle.x = (this.width - this.paddle.width) / 2;
  }

  incrementSettings() {
    this.level.update();
    this.ball.increaseSpeed();
    this.bricks.rows += 1;
  }

  drawBricks() {
    this.bricks.render(this.ctx);
  }

  // eslint-disable-next-line class-methods-use-this
  randomColor() {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += hex[Math.floor(Math.random() * hex.length)];
    }
    return color;
  }

  collisionDetection() {
    for (let i = 0; i < this.bricks.bricks.length; i += 1) {
      const b = this.bricks.bricks[i];
      if (b.status === true) {
        if (
          this.ball.x > b.x
          && this.ball.x < b.x + b.width
          && this.ball.y > b.y
          && this.ball.y < b.y + b.height
        ) {
          this.ball.dy = -this.ball.dy;
          this.ball.color = this.randomColor();
          this.bricks.currentBricks -= 1;
          this.score.update(1);
          b.status = false;
          if (this.bricks.currentBricks === 0) {
            // alert('YOU WIN, CONGRATULATIONS!');
            // document.location.reload();
            this.incrementSettings();
            this.initGame();
            this.bricks.setup();
          }
        }
      }
    }
  }
}

export default Game;
