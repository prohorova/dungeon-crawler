import BTree from './BTree';
import Container from './Container';
import Square from './Square';
import Enemy from './Enemy';
import Player from './Player';
import { Tile, WeaponTile, EnemyTile, HealthTile } from './Tile';
import tileTypes from './tileTypes';
import moveDirections from './moveDirections';
import { H_RATIO, W_RATIO, WIDTH, HEIGHT, IT_COUNT, WEAPONS,
    ENEMY_COUNT, ENEMY_PARAMS, HEALTH_COUNT, HEALTH_PARAMS, DUNGEONS_COUNT, XP_TO_NEXT_LEVEL, WIN_XP } from './params';

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomBool = () => {
    return Math.random() >= 0.5;
};

export const copyBoard = (board) => {
    let newBoard = [];
    for (let i = 0, l = board.length; i < l; i++) {
        newBoard[i] = [];
        for (let j = 0, m = board[0].length; j < m; j++) {
            newBoard[i][j] = Object.assign({}, board[i][j]);
        }
    }
    return newBoard;
};

export const overturnBoard = (board) => {
    let turnedBoard = [];
    for (let i = 0, l = board[0].length; i < l; i++) {
        turnedBoard[i] = [];
        for (let j = 0, m = board.length; j < m; j++) {
            turnedBoard[i][j] = board[j][board[0].length - i - 1];
        }
    }
    return turnedBoard;
};

// board

export const initBoard = (width, height) => {
    let board = [];
    for (let i = 0; i < width; i++) {
        board[i] = [];
        for (let j = 0; j < height; j++) {
            board[i][j] = new Tile();
        }
    }
    return board;
};

export const findEmptyPosition = (board, rooms) => {
    let randRoom = rooms[random(0, rooms.length - 1)];
    let x = random(randRoom.x, randRoom.x + randRoom.w);
    let y = random(randRoom.y, randRoom.y + randRoom.h);
    if (board[x][y].type === tileTypes.FLOOR) {
        return {x, y}
    } else {
        return findEmptyPosition(board, rooms);
    }
};

export const generateRoom = (container) => {
    let paddingLeft = random(1, container.w/4);
    let paddingRight = random(1, container.w/4);
    let paddingBottom = random(1, container.h/4);
    let paddingTop = random(1, container.h/4);
    let roomX = container.x + paddingLeft;
    let roomY = container.y + paddingBottom;
    let roomW = container.w - paddingLeft - paddingRight;
    let roomH = container.h - paddingTop - paddingBottom;
    return new Square(roomX, roomY, roomW, roomH);
};

export const generateCorridor = (point1, point2) => {
    let h = point2.y - point1.y || 1;
    let w = point2.x - point1.x || 1;
    return new Square(point1.x, point1.y, w, h);
};

export const randomSplit = (container) => {
    let container1, container2;
    if (getRandomBool()) {
        // vertical split
        container1 = new Container(container.x, container.y, random(0, container.w), container.h);
        container2 = new Container(container.x + container1.w, container.y, container.w - container1.w, container.h);

        let c1_w_ratio = container1.w / container1.h;
        let c2_w_ratio = container2.w / container2.h;

        if (c1_w_ratio < W_RATIO || c2_w_ratio < W_RATIO) {
            return randomSplit(container);
        }
    } else {
        // horizontal split
        container1 = new Container(container.x, container.y, container.w, random(0, container.h));
        container2 = new Container(container.x, container.y + container1.h, container.w, container.h - container1.h);

        let c1_h_ratio = container1.h / container1.w;
        let c2_h_ratio = container2.h / container2.w;

        if (c1_h_ratio < H_RATIO || c2_h_ratio < H_RATIO) {
            return randomSplit(container);
        }
    }
    return [container1, container2];
};

export const splitContainer = (container, iteration) => {
    if (iteration < 1) return;
    let root = new BTree(container);
    if (iteration > 1) {
        let containers = randomSplit(container);
        root.lchild = splitContainer(containers[0], iteration - 1);
        root.rchild = splitContainer(containers[1], iteration - 1);
        root.corridor = generateCorridor(root.lchild.container.center, root.rchild.container.center)
    } else {
        root.room = generateRoom(container);
    }
    return root;
};


export const initGame = (_dungeonNumber, _player, width = WIDTH, height = HEIGHT) => {
    let dungeonNumber = _dungeonNumber || 1;
    let player = _player || new Player();

    let board = initBoard(width, height);

    let rootContainer = new Container(0, 0, WIDTH, HEIGHT);
    let containerTree = splitContainer(rootContainer, IT_COUNT);
    let rooms = containerTree.getRooms();
    let corridors = containerTree.getCorridors();
    let floorAreas = rooms.concat(corridors);

    for (let i = 0, l = floorAreas.length; i < l; i++) {
        let floorArea = floorAreas[i];
        for (let j = floorArea.x; j < floorArea.w + floorArea.x; j++) {
            for (let m = floorArea.y; m < floorArea.h + floorArea.y; m++) {
                board[j][m] = new Tile(tileTypes.FLOOR);
            }
        }
    }

    // generate player on a board
    let playerPosition = findEmptyPosition(board, rooms);
    player.x = playerPosition.x;
    player.y = playerPosition.y;

    board[playerPosition.x][playerPosition.y] = new Tile(tileTypes.PLAYER);

    // generate weapon on a board
    let weapon = WEAPONS[dungeonNumber];
    let weaponPosition = findEmptyPosition(board, rooms);
    board[weaponPosition.x][weaponPosition.y] = new WeaponTile(weapon);

    // generate exit on a board
    if (dungeonNumber < DUNGEONS_COUNT) {
        let exitPosition = findEmptyPosition(board, rooms);
        board[exitPosition.x][exitPosition.y] = new Tile(tileTypes.EXIT);
    }

    // generate enemies on a board
    let enemyCount = dungeonNumber === DUNGEONS_COUNT ? ENEMY_COUNT - 1 : ENEMY_COUNT;
    for (let i = 0; i < enemyCount; i++) {
        let enemyPosition = findEmptyPosition(board, rooms);
        let health = random(ENEMY_PARAMS.minHealth, ENEMY_PARAMS.maxHealth) * dungeonNumber;
        let damage = random(ENEMY_PARAMS.minDamage, ENEMY_PARAMS.maxDamage) * dungeonNumber;
        board[enemyPosition.x][enemyPosition.y] =
            new EnemyTile(new Enemy(health, damage));
    }
    if (dungeonNumber === DUNGEONS_COUNT) {  // generate a boss
        let enemyPosition = findEmptyPosition(board, rooms);
        let health = random(ENEMY_PARAMS.minHealth, ENEMY_PARAMS.maxHealth) * dungeonNumber * 3;
        let damage = random(ENEMY_PARAMS.minDamage, ENEMY_PARAMS.maxDamage) * dungeonNumber * 3;
        board[enemyPosition.x][enemyPosition.y] =
            new EnemyTile(new Enemy(health, damage, true));
    }

    //generate health on board
    for (let i = 0; i < HEALTH_COUNT; i++) {
        let healthPosition = findEmptyPosition(board, rooms);
        let health = random(HEALTH_PARAMS.minHealth, HEALTH_PARAMS.maxHealth) * dungeonNumber;
        board[healthPosition.x][healthPosition.y] = new HealthTile(health);
    }

    return {board, player, dungeonNumber};
};

// player

export const attack = (player, enemy) => {
    enemy.health -= player.weapon.damage * player.level;
    if (enemy.health > 0) {
        player.health -= enemy.damage;
    }
};

export const move = (board, player, dungeonNumber, direction) => {
    let {x, y} = findPositionToMoveTo(player, direction);
    let tileToMoveTo = board[x][y];
    if (!tileToMoveTo || tileToMoveTo.type === tileTypes.WALL) {
        return {board, player}
    }
    if (tileToMoveTo.type === tileTypes.WEAPON) {
        let weapon = tileToMoveTo.weapon;
        let newBoard = copyBoard(board);
        newBoard[player.x][player.y] = new Tile(tileTypes.FLOOR);
        newBoard[x][y] = new Tile(tileTypes.PLAYER);

        let newPlayer = {...player, x, y, weapon};
        return {board: newBoard, player: newPlayer};
    }
    if (tileToMoveTo.type === tileTypes.HEALTH) {
        let health = player.health + tileToMoveTo.health;
        let newBoard = copyBoard(board);
        newBoard[player.x][player.y] = new Tile(tileTypes.FLOOR);
        newBoard[x][y] = new Tile(tileTypes.PLAYER);

        let newPlayer = {...player, x, y, health};
        return {board: newBoard, player: newPlayer};
    }
    if (tileToMoveTo.type === tileTypes.ENEMY) {
        let newBoard = copyBoard(board);
        let enemy = newBoard[x][y].enemy;
        let newPlayer = Object.assign({}, player);
        attack(newPlayer, enemy);
        if (enemy.health <=0) {   // enemy was killed
            if (enemy.isBoss) {
                return {newPlayer, newBoard, dungeonNumber: dungeonNumber + 1}
            }
            newBoard[player.x][player.y] = new Tile(tileTypes.FLOOR);
            newBoard[x][y] = new Tile(tileTypes.PLAYER);
            newPlayer.x = x;
            newPlayer.y = y;
            newPlayer.xp += WIN_XP * newPlayer.level;
            if (newPlayer.xp >= newPlayer.level * XP_TO_NEXT_LEVEL) {
                newPlayer.xp -= newPlayer.level * XP_TO_NEXT_LEVEL;
                newPlayer.level++;
            }
        } else if (newPlayer.health <=0) { // player was killed
            newBoard[player.x][player.y] = new Tile(tileTypes.FLOOR);
            newPlayer.x = null;
            newPlayer.y = null;
        }
        //no one was killed
        return {board: newBoard, player: newPlayer};
    }
    if (tileToMoveTo.type === tileTypes.FLOOR) {
        let newBoard = copyBoard(board);
        newBoard[player.x][player.y] = new Tile(tileTypes.FLOOR);
        newBoard[x][y] = new Tile(tileTypes.PLAYER);

        let newPlayer = {...player, x, y};
        return {board: newBoard, player: newPlayer};
    }
    if (tileToMoveTo.type === tileTypes.EXIT) {
        return { dungeonNumber: dungeonNumber + 1 }
    }
    return {board, player, dungeonNumber}
};

export const findPositionToMoveTo = (player, direction) => {
    switch (direction) {
        case moveDirections.UP:
            return {x: player.x, y: player.y + 1};
        case moveDirections.DOWN:
            return {x: player.x, y: player.y - 1};
        case moveDirections.LEFT:
            return {x: player.x - 1, y: player.y};
        case moveDirections.RIGHT:
            return {x: player.x + 1, y: player.y};
        default:
            return {x: player.x, y: player.y}
    }
};











