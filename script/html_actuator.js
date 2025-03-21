class HTMLActuator {
    constructor() {
        this.tileContainer = document.querySelector(".tile-container"); //returns the first element that matches a CSS selector
        this.scoreContainer = document.querySelector(".score-number");
        this.bestContainer = document.querySelector(".bestscore-container");

        this.score = 0
    };

    actuate(grid, metadata) {
        window.requestAnimationFrame(() => {
            this.clearContainer(this.tileContainer);

            grid.cells.forEach(column => {
                // console.log(grid.cells)
                column.forEach(cell => {
                    if (cell) {
                        this.addTile(cell);
                    }
                });
            });

            this.updateScore(metadata.score);
            // this.updateBestScore(metadata.bestScore);

            if (metadata.terminated) {
                if (metadata.over) {
                    this.message(false); // You lose
                } else if (metadata.won) {
                    this.message(true); // You win!
                }
            }
        });
    };

    clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };

    addTile(tile) {
        const wrapper = document.createElement("div");
        const positionClass = "tile-position-" + tile.x + "-" + tile.y;
        const classes = ["tile", "tile-" + tile.value, positionClass];
        this.applyClasses(wrapper, classes);

        const inner = document.createElement("div");
        inner.classList.add("tile-cell");
        inner.textContent = tile.value;

        // Add the inner part of the tile to the wrapper
        wrapper.appendChild(inner);

        // Put the tile on the board
        this.tileContainer.appendChild(wrapper);
    };

    applyClasses(element, classes) {
        element.setAttribute("class", classes.join(" "));
    };

    updateScore(score) {
        this.clearContainer(this.scoreContainer);

        var difference = score - this.score;
        this.score = score;

        this.scoreContainer.textContent = this.score;

        if (difference > 0) {
            var addition = document.createElement("div");
            addition.classList.add("score-addition");
            addition.textContent = "+" + difference;

            this.scoreContainer.appendChild(addition);
        }
    };

}