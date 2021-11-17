import {
    BACKGROUND_IMAGE_HEIGHT,
    BACKGROUND_IMAGE_WIDTH,
    CANVAS_NOT_SUPPORTED,
    GAME_BOARD_HEIGHT,
    GAME_BOARD_WIDTH, GAME_ID,
} from './const';
import tile from '../assets/tile.png';

/**
 * Draws the game area on canvas
 */
export default class Area {
    /**
     *
     * @param {number} width width of the canvas element
     * @param {number} height height of the canvas element
     * @param {HTMLElement} element element under which canvas needs to be created
     */
    constructor(width, height, element) {
        this.width = width;
        this.height = height;
        this.element = element;
    }

    generateAreaMatrix() {
        const rows = (this.height + GAME_BOARD_HEIGHT) / BACKGROUND_IMAGE_HEIGHT;
        const columns = (this.width + GAME_BOARD_WIDTH) / BACKGROUND_IMAGE_WIDTH;
        this.areaMatrix = [];
        for (let i = 0; i < rows; i += 1) {
            const currentRow = [];
            for (let j = 0; j < columns; j += 1) {
                this.currentRow.push(1);
            }
            this.areaMatrix.push(currentRow);
        }
    }

    async drawArea() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.id = GAME_ID;
        canvas.appendChild(this.canvasNotSupported());
        await this.createCanvasBackground(canvas);
        this.element.appendChild(canvas);
    }

    // eslint-disable-next-line class-methods-use-this
    getContext() {
        const canvasElement = document.getElementById(GAME_ID);
        return canvasElement.getContext('2d');
    }

    /**
     *
     * @param {HTMLCanvasElement} canvasElement element
     */
    async createCanvasBackground(canvasElement) {
        const context = canvasElement.getContext('2d');
        if (context === null) {
            this.webGlNotSupported();
        }
        await this.loadImage();
        const imageWidth = this.imageData.width;
        const imageHeight = this.imageData.height;
        const noOfRows = Math.ceil(this.height / imageHeight);
        const noOfCols = Math.ceil(this.width / imageWidth);

        for (let i = 0; i < noOfRows; i += 1) {
            for (let j = 0; j < noOfCols; j += 1) {
                context.drawImage(this.imageData, j * imageWidth, i * imageHeight);
            }
        }
    }

    loadImage() {
        const img = new Image();

        const d = new Promise((resolve, reject) => {
            img.onload = () => {
                this.imageData = img;
                resolve(img);
            };

            img.onerror = () => {
                reject(new Error('Could not load image'));
            };
        });

        img.src = tile;
        return d;
    }

    reset() {
        const context = this.getContext();
        context.save();
        const imageWidth = this.imageData.width;
        const imageHeight = this.imageData.height;
        const noOfRows = Math.ceil(this.height / imageHeight);
        const noOfCols = Math.ceil(this.width / imageWidth);

        for (let i = 0; i < noOfRows; i += 1) {
            for (let j = 0; j < noOfCols; j += 1) {
                context.drawImage(this.imageData, j * imageWidth, i * imageHeight);
            }
        }
        context.globalAlpha = 1;
    }

    // eslint-disable-next-line class-methods-use-this
    canvasNotSupported() {
        const notSupportedElement = document.createElement('p');
        notSupportedElement.innerText = CANVAS_NOT_SUPPORTED;
        return notSupportedElement;
    }

    // eslint-disable-next-line class-methods-use-this
    webGlNotSupported() {
        // eslint-disable-next-line no-alert
        alert('Unable to initialize webgl');
    }
}
