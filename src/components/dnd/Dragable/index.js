import React, { useState } from 'react'

import styles from './styles.module.scss';

export default function Dragable({
  children,
  className,
  style,
  onDragStart = () => { },
  onDragEnd = () => { },
  ...rest }) {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e);
  }

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragStart(e);
  }

  return (
    <div
      className={`${styles.draggable} ${isDragging ? styles.dragging : ''} ${className}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable="true"
      {...rest}
    >
      {children}
    </div>
  )
}
