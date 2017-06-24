class Search {
    constructor() {
        this.container = document.createElement('header');
        this.input = document.createElement('input');
        this.button = document.createElement('button');
    }

    addInput(handler) {
        this.button.innerHTML = 'Search';
        this.container.appendChild(this.input);
        this.container.appendChild(this.button);
        document.body.appendChild(this.container);

        this.button.addEventListener('click', function() {
            handler(this.input.value);
        }.bind(this));
    }
}

module.exports = Search;
