class Tile {
    constructor(postition, value) {
        this.x = postition.x;
        this.y = postition.y;
        this.value = value || 2;
        this.mergedCell = null;
    }

    updatePosition(position) {
        this.x = position.x;
        this.x = position.y;
    }
}