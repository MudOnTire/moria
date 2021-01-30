import React, { useState, useContext } from 'react';
import { queryWidget } from 'Src/config/widgets';
import { context, actions } from 'Src/store';

import styles from './styles.module.scss'

export default function Droppable({ children }) {
  const store = useContext(context);
  const { dispatch, pageConfig } = store

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
    if (!widgetId) return;
    const widget = queryWidget(widgetId);
    if (!widget) return;
    dispatch({
      type: actions.UPDATE_PAGE_CONFIG,
      payload: [...pageConfig, widget]
    });
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
