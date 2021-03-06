/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(x = 0, y = 0, radius = 10, color = '#E96969', ballSpeed = 2) {
    super(x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    this.dx = ballSpeed;
    this.dy = -ballSpeed;
    this.ballSpeed = ballSpeed;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  increaseSpeed() {
    this.ballSpeed += 1;
  }
}

export default Ball;
