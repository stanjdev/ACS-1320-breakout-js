/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Background extends Sprite {
  constructor(width, height, color = 'lightgreen') {
    super();
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

export default Background;
