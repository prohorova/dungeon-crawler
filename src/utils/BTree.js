export default class BTree {
    constructor(container, lchild, rchild) {
        this.container = container;
        this.lchild = lchild;
        this.rchild = rchild;
        this.room = null;
        this.corridor = null;
    }

    getRooms(queue = []) {
        if (this.lchild === undefined && this.rchild === undefined) {
            queue.push(this.room);
        } else {
            this.lchild.getRooms(queue);
            this.rchild.getRooms(queue);
        }
        return queue;
    }

    getCorridors(queue = []) {
        if (this.lchild && this.rchild ) {
            queue.push(this.corridor);
            this.lchild.getCorridors(queue);
            this.rchild.getCorridors(queue);
        }
        return queue;
    }

    getContainers() {
        if (this.lchild === undefined && this.rchild === undefined)
            return [this.container];
        else
            return [].concat(this.lchild.getContainers(), this.rchild.getContainers())
    }

    getLevel(level, queue = []) {
        if (level === 1) {
            queue.push(this.container);
        } else {
            if (this.lchild !== undefined) {
                this.lchild.getLevel(level - 1, queue);
            }
            if (this.rchild !== undefined) {
                this.rchild.getLevel(level - 1, queue);
            }
        }
        return queue;
    }
}