import React, { useState } from 'react';

import styles from './styles.module.scss'

export default function Droppable({ children }) {

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  }

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  }

  const handleDragDrop = (e) => {
    setIsDragOver(false);
    const widgetId = e.dataTransfer.getData('text');
    console.log('dropped', widgetId);
  }

  return (
    <div
      className={`${styles.droppable} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
    >
      {children}
    </div>
  )
}
