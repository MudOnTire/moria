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
  const [activeSensor, setActiveSensor] = useState(null);

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
    const widgetId = e.dataTransfer.getData('text');
    onDrop(widgetId);
  }

  const handleDragOverSensors = (direction) => {
    if (!direction) return;
    setActiveSensor(direction);
  }

  const handleDragLeaveSensors = (direction) => {
    if (!direction) return;
    setActiveSensor(null);
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
      <div
        className={`${styles.sensor} ${styles.topSensor} ${activeSensor === 'top' ? styles.activeSensor : ''}`}
        onDragOver={() => { handleDragOverSensors('top') }}
        onDragLeave={() => { handleDragLeaveSensors('top') }}
      />
      <div
        className={`${styles.sensor} ${styles.bottomSensor} ${activeSensor === 'bottom' ? styles.activeSensor : ''}`}
        onDragOver={() => { handleDragOverSensors('bottom') }}
        onDragLeave={() => { handleDragLeaveSensors('bottom') }}
      />
    </div>
  )
}
