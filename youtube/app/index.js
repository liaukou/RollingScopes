const Search = require('./search');
const Loader = require('./loader');
const Swipe = require('./swipe');

let container = document.createElement('div');
container.className = 'container';

let search = new Search();
let loader = new Loader(container);
let swipe = new Swipe(container, loader.addItems.bind(loader));

search.addInput(loader.addItems.bind(loader));
swipe.addListeners();
