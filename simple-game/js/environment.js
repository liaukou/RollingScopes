class GameArea {
    constructor(width, height) {
        this.el              = document.createElement('div');
        this.el.id           = 'game-field';
        this.el.style.width  = width  + 'px';
        this.el.style.height = height + 'px';
        this.positionY       = 0;
    }

    move(y) {
        if (this.positionY >= 400) {
            this.positionY = 0;
        }
        this.positionY += y;
    }

    updateMove() {
        this.el.style.backgroundPosition = `0 ${this.positionY}px`;
    }
}

class Enemy {
    constructor(width, height, areaWidth) {
        this.width           = width;
        this.height          = height;
        this.el              = document.createElement('div');
        this.el.id           = 'enemy';
        this.positionX       = Math.random() * (areaWidth - this.width);
        this.positionY       = -this.height;
        this.el.style.width  = this.width  + 'px';
        this.el.style.height = this.height + 'px';
        this.crashed         = false;
    }

    move(y) {
        this.positionY += y;
    }

    updateMove() {
        this.el.style.transform = `translate(${this.positionX}px,${this.positionY}px)`;
    }

    updateState() {
        this.el.style.backgroundPosition = `${-this.width}px -${playerHeight}px`;
    }
}

class MedKit {
    constructor(width, height, areaWidth) {
        this.width           = width;
        this.height          = height;
        this.el              = document.createElement('div');
        this.el.id           = 'aid-kit';
        this.el.style.width  = this.width  + 'px';
        this.el.style.height = this.height + 'px';
        this.positionX       = Math.random() * (areaWidth - this.width);
        this.positionY       = -this.height;
    }

    move(y) {
        this.positionY += y;
    }

    updateMove() {
        this.el.style.transform = `translate(${this.positionX}px,${this.positionY}px)`;
    }
}
