function Node(key, value) {
    this.key = key;
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
};

function BinarySearchTree() {
    this._root = null;
};

function bigger(parent, node) {
    if (parent > node) { return true }
        else { return false }
}

BinarySearchTree.prototype.root = function() {
    return this._root.value;
}

BinarySearchTree.prototype.insert = function(key, value) {
    var node = new Node(key, value);
    if (this._root) {
        var parent = this._root;
        while (true) {
            if (bigger(parent.key, node.key)) {
                if (parent.left) {
                    parent = parent.left;
                } else {
                    parent.left = node;
                    node.parent = parent;
                    break;
                }
            } else {
                if (parent.right) {
                    parent = parent.right;
                } else {
                    parent.right = node;
                    node.parent = parent;
                    break;
                }
            }
        }
    } else {
        this._root = node;
    }
    return this;
};

BinarySearchTree.prototype.search = function(key) {
    if (!this._root) { throw err }
    var node = this._root;
    while (true) {
        if (node.key === key) { return node.value }
        else if (bigger(node.key, key)) {
            node = node.left;
        }
        else {
            node = node.right;
        }
    }
}

BinarySearchTree.prototype.contains = function(value) {
    var tree = this.traverse();
    if (tree.indexOf(value) > -1) { return true }
    return false;
}

BinarySearchTree.prototype.traverse = function(bool) {
    var result = [];
    var node = this._root;
    var find = function(node) {
        if (node) {
            result.push(node.value);
            if (node.left && node.right) {
                find(node.right);
                find(node.left);
            }
            else if (node.right) {
                find(node.right);
            }
            else if (node.left) {
                find(node.left);
            }
        }
    }
    find(node);
    return result;
}
