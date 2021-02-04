import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function Divider({ containerSettings = {}, onDrop = () => { } }) {

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e) => {
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
    const widgetId = e.dataTransfer.getData('text');
    onDrop(widgetId);
  }

  return (
    <div
      className={`${styles.divider} ${isDragOver ? styles.dragOver : ''} ${containerSettings.flexDirection === 'row' ? styles.vertical : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  )
}
