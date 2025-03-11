class KeyboardInputManager {
    constructor() {
        this.events = {};

        if (window.navigator.msPointerEnabled) {
            //Internet Explorer 10 style
            this.eventTouchstart = "MSPointerDown";
            this.eventTouchmove = "MSPointerMove";
            this.eventTouchend = "MSPointerUp";
        } else {
            this.eventTouchstart = "touchstart";
            this.eventTouchmove = "touchmove";
            this.eventTouchend = "touchend";
        }

        this.listen();
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    };

    emit(event, data) {
        const callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    };

    restart(event) {
        event.preventDefault();
        this.emit("restart");
    }

    listen() {
        const map = {
            "ArrowUp": 0, // up
            "ArrowLeft": 1, // right
            "ArrowDown": 2, // down
            "ArrowRight": 3, // left
            75: 0, // Vim up
            76: 1, // Vim right
            74: 2, // Vim down
            72: 3, // Vim left
            "W": 0, // W
            "D": 1, // D
            "S": 2, // S
            "A": 3, // A
        };

        document.addEventListener("keydown", event => {
            const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
            const mapped = map[event.key];

            if (!modifiers) {
                if (mapped !== undefined) {
                    event.preventDefault();
                    console.log(event.key);
                    this.emit("move", mapped);
                }

                // Restart with R or r
                if (event.key == "R" || event.key == "r") {
                    this.restart(event);
                }
            }
        });
    }
}
