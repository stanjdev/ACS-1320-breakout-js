import Sprite from './sprite';

class Score extends Sprite {
  constructor(x, y, color = '#0095DD', font = '') {
    super(x, y, color);
    this.font = font;
    this.score = 0;
  }

  update(points) {
    
  }

  reset() {
    
  }
}

export default Score;
