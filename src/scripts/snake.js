import {
    LEFT, SNAKE_BASE_ROTATE_ANGLE, SNAKE_BASE_SPEED_X, SNAKE_BASE_SPEED_Y,
} from './const';

export default class Snake {
    /**
     *
     * @param {number} noOfPoints number of circles that constitutes snakes body
     * @param {number} radius radius of biggest circle of body
     * @param {number} x start position of the snake relative to viewport top left
     * @param {number} y start position of the snake relative to viewport top left
     * @param {CanvasRenderingContext2D} context
     */
    constructor(noOfPoints, radius, x, y, snakePresent, context) {
        this.numberOfPoints = noOfPoints;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.isSnakePresent = snakePresent;
        this.context = context;
        this.points = [];
        this.rotation = 0;
        this.velocityX = SNAKE_BASE_SPEED_X;
        this.velocityY = SNAKE_BASE_SPEED_Y;
        this.generateSnakePoints();
    }

    generateSnakePoints() {
        if (this.isSnakePresent) {
            return this.points;
        }
        let currentY = this.y;
        const currentX = this.x;
        for (let i = 0; i < this.numberOfPoints; i += 1) {
            this.points.push({ x: currentX, y: currentY });
            currentY += this.radius * 2;
        }
        return this.points;
    }

    applyLinkConstraint() {
        const newPoints = [this.points[0]];
        const len = this.radius * 1.75;
        for (let i = 1; i < this.points.length; i += 1) {
            // satisfy distance constraint here
            const a = newPoints[i - 1];
            const b = this.points[i];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);
            const vba = { x: dx / distance || 0, y: dy / distance || 0 };
            const x = a.x - len * vba.x;
            const y = a.y - len * vba.y;
            newPoints.push({ x, y });
        }
        this.points = newPoints;
    }

    rotate(direction) {
        this.rotation += direction === LEFT ? -SNAKE_BASE_ROTATE_ANGLE : SNAKE_BASE_ROTATE_ANGLE;
    }

    updatePosition() {
        this.x += this.velocityX * Math.sin(-(this.rotation * Math.PI) / 180);
        this.y += this.velocityY * Math.cos(-(this.rotation * Math.PI) / 180);
        this.points[0] = { x: this.x, y: this.y };
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    render() {
        this.applyLinkConstraint();
        const headPoint = this.points[0];
        this.points.forEach((point, i) => {
            this.context.save();
            this.context.translate(
                (point.x - headPoint.x) + window.innerWidth * 0.5,
                (point.y - headPoint.y) + window.innerHeight * 0.5,
            );
            this.context.beginPath();
            this.context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
            this.context.fillStyle = '#CD384B';
            this.context.fill();
            this.context.lineWidth = 0.2;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 2;
            this.context.shadowBlur = 5;
            this.context.shadowColor = 'rgba(0,0,0,0.14)';
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 1;
            this.context.shadowBlur = 10;
            this.context.shadowColor = 'rgba(0,0,0,0.12)';
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 2;
            this.context.shadowBlur = 4;
            this.context.shadowColor = 'rgba(0,0,0,0.2)';
            this.context.stroke();
            this.context.closePath();
            this.context.fillStyle = 'white';
            this.context.fillText(i, 0, 0);
            this.context.restore();
        });
    }
}
