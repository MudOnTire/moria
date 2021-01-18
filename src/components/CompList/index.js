import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';

import styles from './styles.module.scss';

export default function CompList() {
  return (
    <div className={styles.container}>
      <Dragable className={styles.compItem}>
        <h1>title</h1>
      </Dragable>
      <Dragable className={styles.compItem}>
        <img src="http://source.unsplash.com/random/150x150" />
      </Dragable>
    </div>
  )
}
