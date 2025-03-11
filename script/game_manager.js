class GameManager {
    constructor(size, InputManager, Actuator, StorageManager) {
        this.size = size;
        this.inputManager = new InputManager;
        this.storageManager = new StorageManager;
        this.actuator = new Actuator;

        this.startTiles = 2;
        //bind?
        // this.inputManager.on("move", this.move.bind(this));

        this.setup();
    }

    actuate() {
        this.actuator.actuate(this.grid, {
            score: this.score,
            over: this.over,
            won: this.won
        })
    };

    setup() {
        this.grid = new Grid(this.size);
        this.score = 0;
        this.over = false;
        this.won = false;

        this.addStartTile();

        this.actuate();
    }

    addStartTile() {
        this.grid.randomAvailableCell();
    }

    addRandomTile() {

    }
}