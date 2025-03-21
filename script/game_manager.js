class GameManager {
    constructor(size, InputManager, Actuator, StorageManager) {
        this.size = size;
        this.inputManager = new InputManager;
        this.storageManager = new StorageManager;
        this.actuator = new Actuator;

        this.startTiles = 2;
        //bind?
        this.inputManager.on("move", this.move.bind(this));
        this.inputManager.on("restart", this.restart.bind(this));

        this.setup();
    }

    restart() {
        this.setup();
    };

    setup() {
        this.grid = new Grid(this.size);
        this.score = 0;
        this.over = false;
        this.won = false;

        this.addStartTile();

        this.actuate();
    };

    actuate() {
        this.actuator.actuate(this.grid, {
            score: this.score,
            over: this.over,
            won: this.won
        })
    };

    addStartTile() {
        for (let i = 0; i < this.startTiles; i++) {
            this.grid.randomAvailableCell();
        }
    };

    addRandomTile() {
        this.grid.randomAvailableCell();
    };

    move(direction) {
        const cellconsol = this.grid.cells;
        let moved = false;
        //check if the game is over

        //get ready to move
        //get the move vector
        const vector = this.getVector(direction);

        //generate traversal order
        const traversalOrder = this.getTraversalOrder(vector);

        //traverse the grid and move the blocks
        traversalOrder.x.forEach(x => {
            traversalOrder.y.forEach(y => {
                const cell = { x: x, y: y };
                const tile = cellconsol[x][y];
                if (tile) {
                    const positions = this.findFarthestPosition(cell, vector);
                    var next = this.grid.cellContent(positions.next);

                    if (next && next.value === tile.value && !next.mergedFrom) {
                        var merged = new Tile(positions.next, tile.value * 2);
                        merged.mergedFrom = [tile, next];

                        this.grid.insertTile(merged);
                        this.grid.removeTile(tile);

                        // Converge the two tiles' positions
                        tile.updatePosition(positions.next);

                        // Update the score
                        this.score += merged.value;

                        // The mighty 2048 tile
                        if (merged.value === 2048) this.won = true;
                    } else {
                        this.moveTile(new Tile(tile), new Tile(positions.farthest, tile.value));
                    }

                    if (!this.positionsEqual(cell, positions.farthest)) {
                        moved = true;
                    }
                }
            })
        });
        //update the game status
        if (moved) {
            this.addRandomTile();
            this.actuate();
        }
    }
    getVector(direction) {
        const map = {
            0: { x: 0, y: -1 },//up
            1: { x: 1, y: 0 },//right
            2: { x: 0, y: 1 },//down
            3: { x: -1, y: 0 },//left
        }
        return map[direction];
    }

    getTraversalOrder(vector) {
        const traversal = { x: [], y: [] };

        for (let i = 0; i < this.size; i++) {
            traversal.x.push(i);
            traversal.y.push(i);
        }
        //if goes right, order starts from right to left
        //if goes down, order starts from bottom to top
        if (vector.x === 1) {
            traversal.x = traversal.x.reverse();
        };
        if (vector.y === 1) {
            traversal.y = traversal.y.reverse()
        };

        return traversal;
    }

    positionsEqual(a, b) {
        return a.x === b.x && a.y === b.y;
    }

    findFarthestPosition(cell, vector) {
        let previous;
        // Progress towards the vector direction until an obstacle is found
        do {
            previous = cell;
            cell = { x: previous.x + vector.x, y: previous.y + vector.y };
        } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

        // Check if the next cell is within bounds

        return {
            farthest: previous,
            next: cell // Used to check if a merge is required
        };
    };

    moveTile(tile, cell) {
        this.grid.cells[tile.x][tile.y] = null;
        this.grid.cells[cell.x][cell.y] = cell;
        tile.updatePosition(cell);
    };
}