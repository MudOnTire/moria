import React from 'react';
import Droppable from 'Src/components/dnd/Droppable';

import styles from './styles.module.scss';

export default function Draft() {
  return (
    <div className={styles.draft}>
      <Droppable>
        <div className={styles.header}></div>
      </Droppable>
    </div>
  )
}
