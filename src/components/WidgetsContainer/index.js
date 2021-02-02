import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import Droppable from 'Src/components/dnd/Droppable';
import { SettingFilled, DeleteFilled } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import { queryWidget, WIDGET_IDs } from 'Src/config/widgets';

import styles from './styles.module.scss';

export default function WidgetsContainer({
  className = '',
  config = {},
  children,
  ...rest
}) {

  const store = useContext(context);
  const { dispatch, pageConfig } = store;

  const [showActions, setShowActions] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setShowActions(true);
  }

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setShowActions(false);
  }

  const handleSetting = (e) => {
    if (!config) return;
    console.log('setting', config);
    dispatch({
      type: actions.SET_CURRENT_WIDGET_CONFIG,
      payload: config
    });
  }

  const handleDelete = (e) => {
    console.log('deleting', config);
    dispatch({
      type: actions.DELETE_WIDGET_CONFIG,
      payload: config.id
    });
  }

  const handleWidgetDrop = (widgetId) => {
    setIsDragOver(false);
    if (!widgetId) return;
    const pageConfigCy = { ...pageConfig };
    const id = `${widgetId}_${new Date().valueOf()}`;
    if (!config.children) config.children = [];
    const child = {
      id,
      widgetId,
      settings: {}
    };
    if (widgetId === WIDGET_IDs.WIDGET_CONTAINER) {
      child.children = [];
    }
    config.children.push(child);
    dispatch({
      type: actions.UPDATE_PAGE_CONFIG,
      payload: pageConfigCy
    });
  }

  const handleDragEnter = (e) => {
    setIsDragOver(true);
  }

  const handleDragOver = (e) => {
    setIsDragOver(true);
  }

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  }

  return (
    <div
      className={`${styles.widgetsContainer} ${isDragOver ? styles.dragOver : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {
        showActions &&
        <div className={styles.actions}>
          <Button
            type="text"
            icon={<SettingFilled style={{ color: "#1890ff" }} />}
            onClick={handleSetting}
          />
          <Button
            type="text"
            icon={<DeleteFilled style={{ color: '#f5222d' }} />}
            onClick={handleDelete}
          />
        </div>
      }
      <Droppable
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleWidgetDrop}
      >
        {children}
        {
          config?.children?.map(c => {
            const widget = queryWidget(c.widgetId);
            if (!widget) return null;
            return (
              <widget.component key={c.id} config={c} />
            )
          })
        }
      </Droppable>
    </div>
  )
}
