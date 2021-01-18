import React, { useState } from 'react'

import styles from './styles.module.scss';

export default function Dragable({ children, widgetId, className, style, ...res }) {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', widgetId);
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
