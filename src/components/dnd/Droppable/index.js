import React, { useState } from 'react';

import styles from './styles.module.scss'

export default function Droppable({
  children,
  className = '',
  onDrop = () => { },
  onDragEnter = () => { },
  onDragOver = () => { },
  onDragLeave = () => { },
  ...rest
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    onDragOver(e);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    onDragEnter(e);
  }

  const handleDragLeave = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
    onDragLeave(e);
  }

  const handleDragDrop = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
    const data = e.dataTransfer.getData('text') || {};
    onDrop(JSON.parse(data));
  }

  return (
    <div
      className={`${styles.droppable} ${isDragOver ? styles.dragOver : ''} ${className}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
      {...rest}
    >
      {children}
    </div>
  )
}
