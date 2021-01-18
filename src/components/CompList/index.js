import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';
import CompItem from 'Src/components/CompItem';

import styles from './styles.module.scss';

export default function CompList() {
  return (
    <div className={styles.compList}>
      <h4 className={styles.secTitle}>Form Components</h4>
      <div className={styles.listSec}>
        <Dragable className={styles.compItem}>
          Input
        </Dragable>
        <Dragable className={styles.compItem}>
          Checkbox
        </Dragable>
        <Dragable className={styles.compItem}>
          Radio Button
        </Dragable>
        <Dragable className={styles.compItem}>
          Button
        </Dragable>
        <Dragable className={styles.compItem}>
          Table
        </Dragable>
      </div>
    </div>
  )
}
