import React from 'react';

import styles from './styles.module.scss';

export default function CompItem({ children }) {
  return (
    <div className={styles.compItem}>
      {children}
    </div>
  )
}
