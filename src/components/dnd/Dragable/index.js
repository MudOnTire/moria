import React, { useState } from 'react'

import styles from './styles.module.scss';

export default function Dragable({ children, className, style, ...res }) {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  }

  const handleDragEnd = () => {
    setIsDragging(false);
  }

  return (
    <div
      className={`${styles.draggable} ${isDragging ? styles.dragging : ''} ${className}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable="true"
      {...res}
    >
      {children}
    </div>
  )
}
