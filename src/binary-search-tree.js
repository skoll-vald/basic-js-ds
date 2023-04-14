const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    let current = this._root;
    let parent = null;
    let direction = null;

    while (current) {
      if (data === current.data) {
        break;
      } else if (data < current.data) {
        parent = current;
        direction = 'left';
        current = current.left;
      } else {
        parent = current;
        direction = 'right';
        current = current.right;
      }
    }

    if (!current) {
      return;
    }

    if (current.left && current.right) {
      let replacementParent = current;
      let replacement = current.right;
      while (replacement.left) {
        replacementParent = replacement;
        replacement = replacement.left;
      }
      current.data = replacement.data;
      current = replacement;
      parent = replacementParent;
      direction = 'right';
    }

    let child = null;
    if (current.left) {
      child = current.left;
    } else if (current.right) {
      child = current.right;
    }
    if (!parent) {
      this._root = child;
    } else if (direction === 'left') {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  min() {
    let current = this._root;
    while (current && current.left) {
      current = current.left;
    }
    return current ? current.data : null;
  }

  max() {
    let current = this._root;
    while (current && current.right) {
      current = current.right;
    }
    return current ? current.data : null;
  }
}


module.exports = {
  BinarySearchTree
};