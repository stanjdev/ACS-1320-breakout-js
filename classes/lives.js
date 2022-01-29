/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Lives extends Sprite {
  constructor(initialLives, x, y, color = '#0095DD', font = '16px Arial') {
    super();
    this.x = x;
    this.y = y;
    this.color = color;
    this.lives = initialLives;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  loseLife() {
    this.lives -= 1;
  }

  reset() {
    const amount = this.lives;
    this.lives = amount;
  }
}

export default Lives;
