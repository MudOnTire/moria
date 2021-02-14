import { PAGES_STORE_KEY } from 'Src/common/constants';

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

function moveTreeItem(tree, targetId, toId) {
  // 自己不能往自己移动
  if (targetId === toId) return;

  const treeItem = getTreeItem(tree, targetId);
  if (!treeItem) return;
  const { item, parentId } = treeItem;

  // 不能在同一个container里面移动
  if (parentId === toId) return;

  let removed = false;
  let added = false;

  if (parentId === 'root') {
    tree.splice(tree.indexOf(item), 1);
    removed = true;
  }

  if (toId === 'root') {
    tree.push(item);
    added = true;
  }

  function traverse(subTree) {
    if (removed && added) return;
    for (let i = 0; i < subTree.length; i++) {
      if (removed && added) return;
      const node = subTree[i];
      if (node.id === parentId) {
        const targetIndex = node.children.indexOf(item);
        node.children.splice(targetIndex, 1);
        removed = true;
      }
      if (node.id === toId) {
        node.children.push(item);
        added = true;
      }
      if (node.children && (!removed || !added)) {
        traverse(node.children);
      }
    }
  }

  traverse(tree);
}

function arrayMoveItemToIndex(array, item, toIndex) {
  const itemCopy = { ...item }
  array.splice(toIndex, 0, itemCopy);
  array.splice(array.indexOf(item), 1);
}

/**
 * 插入widget到container指定index
 */
function insertTreeItem(tree, targetId, toId, toIndex) {
  const treeItem = getTreeItem(tree, targetId);
  if (!treeItem) return;
  const { item, parentId } = treeItem;

  // 在root中平行移动
  if (parentId === toId && parentId === 'root') {
    arrayMoveItemToIndex(tree, item, toIndex);
    return;
  }

  let removed = false;
  let added = false;

  if (parentId === 'root') {
    tree.splice(tree.indexOf(item), 1);
    removed = true;
  }

  if (toId === 'root') {
    tree.splice(toIndex, 0, item);
    added = true;
  }

  function traverse(subTree) {
    if (removed && added) return;
    for (let i = 0; i < subTree.length; i++) {
      if (removed && added) return;
      const node = subTree[i];
      if (node.id === parentId) {
        if (node.id === toId) {
          arrayMoveItemToIndex(node.children, item, toIndex);
          return;
        } else {
          const targetIndex = node.children.indexOf(item);
          node.children.splice(targetIndex, 1);
          removed = true;
        }
      }
      if (node.id === toId) {
        node.children.splice(toIndex, 0, item);
        added = true;
      }
      if (node.children && (!removed || !added)) {
        traverse(node.children);
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

function createFunction(str) {
  return Function(`"use strict";return (${str})`)();
}

function getStorePages() {
  let pages = JSON.parse(localStorage.getItem(PAGES_STORE_KEY));
  return pages;
}

function getStorePage(key) {
  if (!key) return;
  let pages = JSON.parse(localStorage.getItem(PAGES_STORE_KEY));
  return pages?.find(p => p.key === key);
}

function setStorePages(pages) {
  localStorage.setItem(PAGES_STORE_KEY, JSON.stringify(pages));
}

function parseLink(link, data) {
  if (!link) return '';
  let parsed = '';
  let cursor = 0;
  while (cursor < link.length) {
    const char = link[cursor];
    if (char === ':') {
      if (cursor > 0 && link[cursor - 1] === '/') {
        const match = link.slice(cursor + 1).match(/[^\/\?]*/);
        if (match) {
          const param = match[0];
          const value = data[param] || '';
          parsed += value;
          cursor += param.length;
        }
      } else {
        parsed += char;
      }
    } else if (char === '{') {
      const match = link.slice(cursor + 1).match(/[^}]*/);
      if (match) {
        const param = match[0];
        const value = data[param] || '';
        parsed += value;
        cursor += param.length;
      }
    } else if (char === '}') {

    } else {
      parsed += char;
    }
    cursor++;
  }
  return parsed;
}

export {
  removeTreeItem,
  getTreeItem,
  getTreeItemIndex,
  moveTreeItem,
  insertTreeItem,
  updateTreeItem,
  throttle,
  createFunction,
  getStorePages,
  getStorePage,
  setStorePages,
  parseLink
}