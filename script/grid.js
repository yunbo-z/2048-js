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
            const randomValue = Math.random() < 0.5 ? 2 : 4;
            this.cells[randomCell.row][randomCell.col] = randomValue;
            // this.cells.push({ x: randomCell.row, y: randomCell.col });
        }
    };

    eachCell() {

    }
}