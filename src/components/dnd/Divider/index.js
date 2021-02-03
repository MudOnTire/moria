import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function Divider({ onDrop = () => { } }) {

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.stopPropagation();
    setIsDragOver(true);
  }

  const handleDragLeave = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
  }

  const handleDrop = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(e);
  }

  return (
    <div
      className={`${styles.divider} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  )
}
