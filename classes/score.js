/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Score extends Sprite {
  constructor() {
    super();
    this.score = 0;
    this.color = '#0095DD';
    this.x = 8;
    this.y = 20;
    this.font = '16px Arial';
    this.score = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }

  update(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }
}

export default Score;
