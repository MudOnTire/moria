import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function GridCell({ onDrop = () => { }, children }) {

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragOver(true);
  }

  const handleDragLeave = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
  }

  const handleDrop = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
    const data = e.dataTransfer.getData('text') || {};
    onDrop(JSON.parse(data));
  }

  return (
    <div
      className={`${styles.gridCell} ${isDragOver ? styles.dragOver : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}
