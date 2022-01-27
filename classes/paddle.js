import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color);
    this.status = true;
  }
}

export default Paddle;
