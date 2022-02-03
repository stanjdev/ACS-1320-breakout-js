/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class GameLabel extends Sprite {
  constructor(label, numberValue, x, y, color = '#0095DD', font = '16px Arial') {
    super(x, y, color);
    this.label = label;
    this.numberValue = numberValue;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
  }

  render(ctx) {
    const string = this.label;
    const label = string.charAt(0).toUpperCase() + string.slice(1);
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${label}: ${this.numberValue}`, this.x, this.y);
  }

  update(scorePoints = 1) {
    if (this.label === 'score') {
      this.numberValue += scorePoints;
    } else if (this.label === 'level') {
      this.numberValue += 1;
    } else if (this.label === 'lives') {
      this.numberValue -= 1;
    }
  }

  reset() {
    if (this.label === 'lives') {
      const amount = this.numberValue;
      this.numberValue = amount;
    } else {
      this.numberValue = 0;
    }
  }
}

export default GameLabel;
