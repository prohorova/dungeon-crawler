export default class Enemy {
    constructor(health, damage, isBoss = false) {
        this.health = health;
        this.damage = damage;
        this.isBoss = isBoss;
    }
}