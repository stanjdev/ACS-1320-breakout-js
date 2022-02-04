/* eslint-disable import/extensions */
import Brick from './Brick.js';

class Bricks {
  constructor(rows = 3, cols = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.currentBricks = 0;
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.rows * this.cols; i += 1) {
      const row = Math.floor(i / this.cols);
      this.bricks[i] = new Brick(0, 0, undefined, undefined, row % 2 === 0 ? 'orange' : 'crimson');
    }
    this.currentBricks = this.rows * this.cols;
  }

  render(ctx) {
    for (let i = 0; i < this.bricks.length; i += 1) {
      const c = i % this.cols;
      const r = Math.floor(i / this.cols);
      const currBrick = this.bricks[i];
      if (currBrick.status === true) {
        const brickX = (c * (currBrick.width + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (currBrick.height + this.brickPadding)) + this.brickOffsetTop;
        currBrick.x = brickX;
        currBrick.y = brickY;
        currBrick.render(ctx);
      }
    }
  }
}

export default Bricks;
