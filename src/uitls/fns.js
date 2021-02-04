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
 * Get tree item
 */
function getTreeItem(tree, id) {

  let result;

  function traverse(subTree, id, parentId) {
    for (let i = 0; i < subTree.length; i++) {
      const node = subTree[i];
      if (node.id === id) {
        result = {
          item: node,
          parentId
        }
      } else {
        if (node.children) {
          traverse(node.children, id, node.id);
        }
      }
    }
  }

  traverse(tree, id, 'root');
  return result;
}

/**
 * 移动widget到其他container
 */
function moveTreeItem(tree, targetId, toId) {

  const treeItem = getTreeItem(tree, targetId);
  if (!treeItem) return;
  const { item, parentId } = treeItem;

  if (parentId === toId) return;

  if (parentId === 'root') {
    tree.splice(tree.indexOf(item), 1);
  }

  if (toId === 'root') {
    tree.push(item);
  }

  function traverse(subTree) {
    for (let i = 0; i < subTree.length; i++) {
      const node = subTree[i];
      if (node.id === parentId) {
        const targetIndex = node.children.indexOf(item);
        node.children.splice(targetIndex, 1);
        if (toId === 'root') {
          return;
        }
      } else if (node.id === toId) {
        node.children.push(item);
      } else {
        if (node.children) {
          traverse(node.children);
        }
      }
    }
  }

  traverse(tree);
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

export { removeTreeItem, getTreeItem, getTreeItemIndex, moveTreeItem, updateTreeItem, throttle }