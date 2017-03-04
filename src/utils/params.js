import Weapon from './Weapon';

// board

export const H_RATIO = 0.4;
export const W_RATIO = 0.4;
export const WIDTH = 100;
export const HEIGHT = 50;
export const IT_COUNT = 5;

export const TILE_SIZE = 10;
// game

export const HEALTH = 100;

export const HEALTH_COUNT = 6;
export const HEALTH_PARAMS = {
    minHealth: 10,
    maxHealth: 20
};

export const ENEMY_COUNT = 6;
export const ENEMY_PARAMS = {
    minDamage: 10,
    maxDamage: 15,
    minHealth: 15,
    maxHealth: 40
};

export const DUNGEONS_COUNT = 3;
export const WIN_XP = 10;
export const XP_TO_NEXT_LEVEL = ENEMY_COUNT * WIN_XP;

export const WEAPONS = [
    new Weapon('stick', 7),
    new Weapon('dagger', 15),
    new Weapon('mace', 20),
    new Weapon('sword', 28)
];


