'use strict';

const ItemsList = require('./items_list');
const { ComponentConstants } = require('../constants');
const classes = ComponentConstants.DEFAULT_LIST_CLASSES;

function Container() {
    const container = document.createElement('div');
    const itemsList = new ItemsList();

    container.classList.add(...classes);
    container.appendChild(itemsList);

    return container;
}

module.exports = Container;
