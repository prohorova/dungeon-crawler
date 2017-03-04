import Container from './Container';
import * as utils from './utils';

describe('should check game board functionality', () => {
    it('should split container according to predefined iteration', () => {
        const IT_COUNT = 3;
        let rootContainer = new Container(0, 0, 100, 100);
        let containerTree = utils.splitContainer(rootContainer, IT_COUNT);
        expect(containerTree.getContainers().length).toEqual(4);
    });

    it('should split container to smaller containers', () => {
        const IT_COUNT = 3;
        const width = 100;
        const height = 100;
        let rootContainer = new Container(0, 0, width, height);
        let containerTree = utils.splitContainer(rootContainer, IT_COUNT);
        let containers = containerTree.getContainers();
        let containersArea = containers.reduce((area, container) => {
            return area + container.w * container.h;
        }, 0);
        expect(containersArea).toEqual(width*height);
    });

    it('should init board', () => {
        const width = 50;
        const height = 30;
        let board = utils.initBoard(width, height);
        expect(board.length).toEqual(width);
        expect(board[0].length).toEqual(height);
    });

    it('should generate room for container', () => {
        const width = 10;
        const height = 10;
        let container = new Container(0, 0, width, height);
        let room = utils.generateRoom(container);
        expect(room.h).toBeLessThan(container.h);
        expect(room.h).toBeGreaterThan(0);
        expect(room.w).toBeLessThan(container.w);
        expect(room.w).toBeGreaterThan(0);
    });
});