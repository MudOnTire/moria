import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';

import styles from './styles.module.scss';

export default function CompList() {
  return (
    <div className={styles.container}>
      <Dragable display="inline-block">
        <h1>Drag me</h1>
      </Dragable>
    </div>
  )
}
