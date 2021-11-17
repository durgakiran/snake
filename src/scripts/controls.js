import {
    ACCELERATE_EVENT, ACCELERATE_KEYS, LEFT_DIR_EVENT, LEFT_KEYS, RIGHT_DIR_EVENT, RIGHT_KEYS,
} from './const';

/* eslint-disable no-underscore-dangle */
export default class Controls {
    constructor() {
        this._leftEvent = new CustomEvent(LEFT_DIR_EVENT, { status: true });
        this._leftEventStop = new CustomEvent(LEFT_DIR_EVENT, { status: false });
        this._rightEvent = new CustomEvent(RIGHT_DIR_EVENT, { status: true });
        this._rightEventStop = new CustomEvent(RIGHT_DIR_EVENT, { status: false });
        this._accelerateEvent = new CustomEvent(ACCELERATE_EVENT, { status: true });
        this._accelerateEventStop = new CustomEvent(ACCELERATE_EVENT, { status: false });
        this.listenToAllPossible();
    }

    get leftEvent() {
        return this._leftEvent;
    }

    get rightEvent() {
        return this._rightEvent;
    }

    get accelerateEvent() {
        return this._accelerateEvent;
    }

    /**
     *
     * @param {() => any} cb callback
     * @param {string} type string
     */
    // eslint-disable-next-line class-methods-use-this
    addEventsToWindow(cb, type) {
        window.addEventListener(type, cb);
    }

    /**
     *
     * @param {Event} e
     * @param {boolean} status
     */
    // eslint-disable-next-line class-methods-use-this
    raiseCustomEvents(e, status) {
        if (e && (LEFT_KEYS.includes(e.key))) {
            window.dispatchEvent(status ? this._leftEvent : this._leftEventStop);
        } else if (e && (RIGHT_KEYS.includes(e.key))) {
            window.dispatchEvent(status ? this._rightEvent : this._rightEventStop);
        } else if (e && (ACCELERATE_KEYS.includes(e.key))) {
            window.dispatchEvent(status ? this._accelerateEvent : this._accelerateEventStop);
        }
    }

    handlePressEvent(e) {
        this.raiseCustomEvents(e, true);
    }

    handleReleaseEvent(e) {
        this.raiseCustomEvents(e, false);
    }

    listenToAllPossible() {
        window.addEventListener('keydown', this.handlePressEvent.bind(this));
        window.addEventListener('keyup', this.handleReleaseEvent.bind(this));
    }

    removeEventListeners() {
        window.removeEventListener('keydown'.this.raiseCustomEvents);
        window.removeEventListener('keyup', this.raiseCustomEvents);
    }
}
