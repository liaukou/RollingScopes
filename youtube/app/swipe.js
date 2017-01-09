class Swipe {
    constructor(container, func) {
        this.moveX = 0;
        this.startX = 0;
        this.container = container;
        this.x = 0;
        this.func = func;
    }

    start(event) {
        let clientX = 0;
        if (event.clientX) {
            clientX = event.clientX;
        } else if (event.touches[0].clientX) {
            clientX = event.touches[0].clientX;
        }
        this.startX = clientX;
    }

    end(event) {
        let clientX = 0;
        if (event.clientX) {
            clientX = event.clientX;
        } else if (event.changedTouches[0].clientX) {
            clientX = event.changedTouches[0].clientX;
        }
        this.moveX = this.startX - clientX;
        if (this.moveX > 10) {
            this.x = Number(this.container.getAttribute('currentX'));
            this.container.setAttribute('currentX', this.x -= 100);
            this.container.style.transform = `translateX(${this.x}vw)`;
            if (Number(this.container.style.width.slice(0, -2)) - 300 < -this.x) {
                console.log(this.container.style.width.slice(0, -2));
                console.log(this.x);
                this.func();
            }
        } else if (this.moveX < -10 && this.x < 0) {
            this.x = Number(this.container.getAttribute('currentX'));
            this.container.setAttribute('currentX', this.x += 100);
            this.container.style.transform = `translateX(${this.x}vw)`;
        }
    }

    addListeners() {
        this.container.addEventListener('mousedown', this.start.bind(this));
        this.container.addEventListener('touchstart', this.start.bind(this));

        this.container.addEventListener('mouseup', this.end.bind(this));
        this.container.addEventListener('touchend', this.end.bind(this));
    }
}

module.exports = Swipe;
