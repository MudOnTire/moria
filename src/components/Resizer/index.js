import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

export default function Resizer({
  right,
  style = {},
  active = false,
  onActive = () => { },
}) {

  return (
    <div
      className={`${styles.resizer} ${active ? styles.active : ''}`}
      onMouseDown={onActive}
      style={{
        right,
        ...style,
      }}
    />
  )
}
