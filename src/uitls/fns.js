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

export { removeTreeItem }