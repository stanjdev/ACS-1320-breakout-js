import Sprite from './Sprite.js';

class Lives extends Sprite {
  constructor(x, y, color = '#0095DD', font = '') {
    super(x, y, color);
    this.font = font;
  }
  loseLife() {

  }

  reset() {
    
  }
}

export default Lives;
