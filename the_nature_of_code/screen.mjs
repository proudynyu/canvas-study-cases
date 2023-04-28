export class Screen {
    width;
    height;
    canvasId;
    name;

    static screens = []

    constructor(width, height, canvasId, name) {
        this.width = width;
        this.height = height;
        this.canvasId = canvasId;
        this.name = name;
    }

    init() {
        let canvas;

        if (this.canvasId)
            canvas = document.getElementById(this.canvasId)
        else
            canvas = document.querySelector('canvas')

        const ctx = canvas.getContext('2d')

        canvas.width = this.width;
        canvas.height = this.height;

        window.ctx = ctx;

    }
}
