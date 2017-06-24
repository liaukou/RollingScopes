class Player {
    constructor(width, height, areaWidth, areaHeight) {
        this.width           = width;
        this.height          = height;
        this.areaWidth       = areaWidth;
        this.areaHeight      = areaHeight;
        this.el              = document.createElement('div');
        this.el.id           = 'player';
        this.positionX       = (this.areaWidth - this.width) / 2;
        this.positionY       = this.areaHeight - this.height - 10;
        this.el.style.width  = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.state           = 0;
        this.hitcount        = 0;
        this.score           = 0;
        this.hp              = 100;
        this.crashed         = false;
    }

    moveLeft(x) {
        if (this.positionX >= 0) {
            this.positionX -= x;
        }
    }

    moveRight(x) {
        if (this.positionX <= this.areaWidth - this.width) {
            this.positionX += x;
        }
    }

    moveUp(y) {
        if (this.positionY >= 0) {
            this.positionY -= y;
        }
    }

    moveDown(y) {
        if (this.positionY <= this.areaHeight - this.height) {
            this.positionY += y;
        }
    }

    hit() {
        this.hp -= 10;
        this.score++;
        this.hitcount++;
        if (this.hitcount === 5) {
            this.state -= this.width;
            this.hitcount = 0;
        }
        if (this.state === -this.width * 2) {
            this.crashed = true;
        }
    }

    repair() {
        this.hp       = 100;
        this.state    = 0;
        this.hitcount = 0;
    }

    updateMove() {
        this.el.style.transform = `translate(${this.positionX}px,${this.positionY}px)`;
    }

    updateState() {
        this.el.style.backgroundPosition = `${this.state}px 0`;
    }

    reset() {
        this.positionX       = (this.areaWidth - this.width) / 2;
        this.positionY       = this.areaHeight - this.height - 10;
        this.el.style.width  = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.state           = 0;
        this.hitcount        = 0;
        this.score           = 0;
        this.hp              = 100;
        this.crashed         = false;
    }
}
