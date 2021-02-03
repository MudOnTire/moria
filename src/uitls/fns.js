function removeTreeItem(tree, id) {
  function traverse(tree, id) {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.id === id) {
        tree.splice(i, 1);
        break;
      } else {
        if (node.children) {
          traverse(node.children, id);
        }
      }
    }
  }

  traverse(tree, id);
  return tree;
}

/**
 * Get tree item index ammount siblings
 */
function getTreeItemIndex(tree, id) {

  const result = {
    siblingCount: 0,
    index: 0
  }

  function traverse(subTree, id) {
    for (let i = 0; i < subTree.length; i++) {
      const node = subTree[i];
      if (node.id === id) {
        result.siblingCount = subTree.length;
        result.index = i;
        break;
      } else {
        if (node.children) {
          traverse(node.children, id);
        }
      }
    }
  }

  traverse(tree, id);
  return result;
}

/**
 * Update tree item with payload
 */
function updateTreeItem(tree, id, payload) {

  function traverse(subTree, id) {
    for (let i = 0; i < subTree.length; i++) {
      let node = subTree[i];
      if (node.id === id) {
        subTree[i] = {
          ...node,
          ...payload
        }
        break;
      } else {
        if (node.children) {
          traverse(node.children, id);
        }
      }
    }
  }

  traverse(tree, id);
  return tree;
}


function throttle(fn, wait) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date();
    if (now - lastCall >= wait) {
      fn.apply(this, args);
      lastCall = now;
    }
  }
}

export { removeTreeItem, getTreeItemIndex, updateTreeItem, throttle }