/* eslint-disable class-methods-use-this */
import '../css/common.css';
import Area from './area';
import {
    GAME_CONTAINER_ID, LEFT, LEFT_DIR_EVENT, RIGHT, RIGHT_DIR_EVENT,
} from './const';
import Controls from './controls';
import Snake from './snake';

export default class Game {
    constructor(snakes, width, height) {
        this.snakes = snakes;
        this.modelWidth = width;
        this.modelHeight = height;
        this.controls = new Controls();
    }

    cancelAnimtiona() {
        window.onunload = () => {
            this.controls.removeEventListeners();
            window.cancelAnimationFrame(this.animationFrame);
        };
    }

    async draw() {
        this.cameraWidth = window.innerWidth;
        this.cameraHeight = window.innerHeight;
        this.ratioX = this.cameraWidth / this.modelWidth;
        this.ratioY = this.cameraHeight / this.modelHeight;
        const containerNode = document.getElementById(GAME_CONTAINER_ID);
        this.area = new Area(this.cameraWidth, this.cameraHeight, containerNode);
        await this.area.drawArea();
    }

    update() {
        this.currentSnake.updatePosition();
        // const currentSnakePosition = this.currentSnake.getPosition();
        this.area.reset();
        this.currentSnake.render();
        this.animationFrame = requestAnimationFrame(() => {
            // this.update();
        });
    }

    handleSnakeLeftDirEvent() {
        this.currentSnake.rotate(LEFT);
    }

    handleSnakeRightDirEvent() {
        this.currentSnake.rotate(RIGHT);
    }

    changeCurrentSnakeDirection() {
        this.controls.addEventsToWindow(this.handleSnakeLeftDirEvent.bind(this), LEFT_DIR_EVENT);
        this.controls.addEventsToWindow(this.handleSnakeRightDirEvent.bind(this), RIGHT_DIR_EVENT);
    }

    play() {
        this.context = this.area.getContext();
        this.currentSnake = new Snake(10, 15, 40, 40, false, this.context);
        this.currentSnake.render();
        this.changeCurrentSnakeDirection();
        this.update();
        /**
         * 1. find position
         * 2. draw snake
         * 3. move snake
         * 4. draw other snakes
         */
    }
}
