function Node(key, value) {
    this.key = key;
    this.value = value;

    this.parent = null;
    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}

function greater(parent, node) {
    if (parent > node) { return true; }
        else { return false; }
}

BinarySearchTree.prototype.root = function() {
    return this._root.value;
};

BinarySearchTree.prototype.insert = function(key, value) {
    var node = new Node(key, value);
    if (this.root()) {
        var current = this._root;
        while (true) {
            if (greater(current.key, node.key)) {
                if (current.left) {
                    current = current.left;
                } else {
                    current.left = node;
                    node.parent = current;
                    break;
                }
            } else {
                if (current.right) {
                    current = current.right;
                } else {
                    current.right = node;
                    node.parent = current;
                    break;
                }
            }
        }
    } else {
        this._root = node;
    }
    return this;
};

BinarySearchTree.prototype.delete = function(key) {
    var current = this._root;
    while (true) {
        if (!current) { return this; }
        if (current.key === key) { break; }
        if (greater(current.key, key)) {
            current = current.left;
        }
        else {
            current = current.right;
        }
    }

    if (!current.right) {
        if (!current.parent) {
            this._root = current.left;
            this._root.parent = null;
            return this;
        }
        else {
            if (greater(current, current.parent)) {
                current.parent.rigth = current.left;
                if (current.left) { current.left.parent = current.parent; }
                return this;
            }
            else {
                current.parent.left = current.left;
                if (current.left) { current.left.parent = current.parent; }
                return this;
            }
        }
    }

    else if (!current.right.left) {
        current.right.left = current.left;
        if (!current.parent) {
            this._root = current.right;
            this._root.parent = null;
            if (current.left) { current.left.parent = current.right; }
            return this;
        }
        else {
            if (greater(current, current.parent)) {
                current.parent.right = current.right;
                current.right.parent = current.parent;
                if (current.left)  { current.left.parent  = current.right; }
                return this;
            }
            else {
                current.parent.left = current.right;
                current.right.parent = current.parent;
                if (current.left)  { current.left.parent  = current.right; }
                return this;
            }
        }
    }

    else {
        var lastLeft = current.right.left;
        while (lastLeft.left) {
            lastLeft = lastLeft.left;
        }

        lastLeft.parent.left = lastLeft.right;
        if (lastLeft.right) { lastLeft.right.parent = lastLeft.parent; }

        lastLeft.left = current.left;
        if (current.left) { current.left.parent = lastLeft; }

        lastLeft.right = current.right;
        if (current.right) { current.right.parent = lastLeft; }
        if (!current.parent) {
            this._root = lastLeft;
            this._root.parent = null;
            return this;
        }
        else {
            lastLeft.parent = current.parent;
            if (greater(current, current.parent)) {
                current.parent.right = lastLeft;
                return this;
            }
            else {
                current.parent.left = lastLeft;
                return this;
            }
        }
    }
    return this;
};

BinarySearchTree.prototype.search = function(key) {
    if (!this.root()) { throw err; }
    var node = this._root;
    while (true) {
        if (!node) { return node; }
        if (node.key === key) { return node.value; }
        else if (greater(node.key, key)) {
            node = node.left;
        }
        else {
            node = node.right;
        }
    }
};

BinarySearchTree.prototype.contains = function(value) {
    var found = false;
    var find = function(node) {
        if (node && !found) {
            if (node.value === value) { found = true; }
            else {
                find(node.left);
                find(node.right);
            }
        }
    };
    find(this._root);
    return found;
};

BinarySearchTree.prototype.traverse = function(leftRigth) {
    var result = [];
    var node = this._root;
    var build = function(node) {
        if (node) {
            if (leftRigth) {
                build(node.left);
                result.push(node.value);
                build(node.right);
            }
            else {
                build(node.right);
                result.push(node.value);
                build(node.left);
            }
        }
    };
    build(node);
    return result;
};

BinarySearchTree.prototype.verify = function() {
    var isTree = true;
    var checkTree = function(node) {
        if (node && isTree) {
            if (node.left && node.left.key > node.key) {
                isTree = false;
            }
            else if (node.rigth && node.rigth.key < node.key) {
                isTree = false;
            }
            else {
                checkTree(node.left);
                checkTree(node.right);
            }
        }
    };
    checkTree(this._root);
    return isTree;
};
