class Grid {
    constructor(size, previousState) {
        this.size = size;
        this.cells = previousState ? this.fromState(previousState) : this.empty();
    }

    empty() {
        const cells = [];
        for (let x = 0; x < this.size; x++) {
            const row = (cells[x] = []);

            for (let y = 0; y < this.size; y++) {
                row.push(null)
            }
        }
        return cells;
    };

    fromState() {

    };

    randomAvailableCell() {
        //find empty cells
        const emptyCells = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.cells[row][col] === null) {
                    emptyCells.push({ row, col });
                }
            }
        }
        if (emptyCells.length > 0) {
            const randomElement = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomElement];
            const { row: x, col: y } = randomCell;
            const randomValue = Math.random() < 0.8 ? 2 : 4;
            this.insertTile(new Tile({ x, y }, randomValue));

            // this.cells[randomCell.row][randomCell.col] = { x: (randomCell.col), y: (randomCell.row), value: randomValue };
            // this.cells.push({ x: randomCell.row, y: randomCell.col, value: randomValue });
        }
    };

    eachCell() {

    };

    withinBounds(position) {
        return position.x >= 0 && position.x < this.size &&
            position.y >= 0 && position.y < this.size;
    };

    insertTile(tile) {
        this.cells[tile.x][tile.y] = tile;
    };

    removeTile(tile) {
        this.cells[tile.x][tile.y] = null;
    };

    cellAvailable(cell) {
        return !this.cellOccupied(cell);
    };

    cellOccupied(cell) {
        return !!this.cellContent(cell);
    };

    cellContent(cell) {
        if (this.withinBounds(cell)) {
            return this.cells[cell.x][cell.y];
        } else {
            return null;
        }
    };
}