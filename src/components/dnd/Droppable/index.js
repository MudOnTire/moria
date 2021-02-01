import React, { useState, useContext } from 'react';
import { queryWidget } from 'Src/config/widgets';
import { context, actions } from 'Src/store';

import styles from './styles.module.scss'

export default function Droppable({ children, className = '', ...rest }) {
  const store = useContext(context);
  const { dispatch, pageConfig } = store

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }

  const handleDragLeave = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
  }

  const handleDragDrop = (e) => {
    e.stopPropagation();
    setIsDragOver(false);
    const widgetId = e.dataTransfer.getData('text');
    if (!widgetId) return;
    const widget = queryWidget(widgetId);
    if (!widget) return;
    const key = `${widget.id}_${new Date().valueOf()}`;
    dispatch({
      type: actions.UPDATE_PAGE_CONFIG,
      payload: [...pageConfig, { ...widget, key }]
    });
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
