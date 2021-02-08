import React, { useState } from 'react'

import styles from './styles.module.scss';

export default function Dragable({
  dragEnabled = true,
  children,
  className,
  style,
  onDragStart = () => { },
  onDragEnd = () => { },
  ...rest
}) {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    onDragStart(e);
  }

  const handleDragEnd = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    onDragEnd(e);
  }

  return (
    <div
      className={`${styles.draggable} ${isDragging ? styles.dragging : ''} ${className}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={dragEnabled ? "true" : "false"}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}
