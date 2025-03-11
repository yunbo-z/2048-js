class HTMLActuator {
    constructor() {
        this.tileContainer = document.querySelector(".tile-container"); //returns the first element that matches a CSS selector
        this.scoreContainer = document.querySelector(".score-container");
        this.bestContainer = document.querySelector(".bestscore-container");

        this.score = 0
    }

    actuate(grid, metadata) {
        window.requestAnimationFrame(() => {
            // this.clearContainer(this.tileContainer);

            grid.cells.forEach(column => {
                column.forEach(cell => {
                    if (cell) {
                        console.log("🚀 ~ HTMLActuator ~ window.requestAnimationFrame ~ cell:", cell)
                        this.addTile(cell);
                    }
                });
            });

            this.updateScore(metadata.score);
            this.updateBestScore(metadata.bestScore);

            if (metadata.terminated) {
                if (metadata.over) {
                    this.message(false); // You lose
                } else if (metadata.won) {
                    this.message(true); // You win!
                }
            }
        });
    }

    clearContainer(container) {
        while (this.bestContainer.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    addTile(tile) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("tile-wrapper");

        const inner = document.createElement("div");
        inner.classList.add("tile-cell")
        // const position = tile.previousPosition || {};
        const newContent = document.createTextNode(tile);
        // inner.textContent = tile.value;
        inner.appendChild(newContent);

        // Add the inner part of the tile to the wrapper
        wrapper.appendChild(inner);

        // Put the tile on the board
        this.tileContainer.appendChild(wrapper);
    }
}