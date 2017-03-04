import tileTypes from './tileTypes';

export class Tile {
    constructor(type = tileTypes.WALL) {
        this.type = type;
    }
}

export class WeaponTile extends Tile {
    constructor(weapon) {
        super(tileTypes.WEAPON);
        this.weapon = weapon;
    }
}

export class EnemyTile extends Tile {
    constructor(enemy) {
        super(tileTypes.ENEMY);
        this.enemy = enemy;
        this.isBoss = enemy.isBoss;
    }
}

export class HealthTile extends Tile {
    constructor(health) {
        super(tileTypes.HEALTH);
        this.health = health;
    }
}