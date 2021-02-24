import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

export default function Resizer({
  right,
  onActive = () => { },
}) {

  return (
    <div
      className={styles.resizer}
      onMouseDown={onActive}
      style={{
        right
      }}
    />
  )
}
