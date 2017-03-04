import Square from './Square';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default class Container extends Square {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.center = new Point(x + Math.floor(w/2), y + Math.floor(h/2));
    }
}