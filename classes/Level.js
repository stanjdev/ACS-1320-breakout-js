/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Level extends Sprite {
  constructor(level, x, y, color = '#0095DD', font = '16px Arial') {
    super();
    this.level = level;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Level: ${this.level}`, this.x, this.y);
  }

  updateLevel() {
    this.level += 1;
  }

  reset() {
    this.level = 0;
  }
}

export default Level;
