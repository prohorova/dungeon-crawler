import { HEALTH, WEAPONS } from './params';

export default class Player {
    constructor(x = 0, y = 0, level = 1, health = HEALTH, weapon = WEAPONS[0], xp = 0) {
        this.x = x;
        this.y = y;
        this.level = level;
        this.health = health;
        this.weapon = weapon;
        this.xp = xp;
    }
}