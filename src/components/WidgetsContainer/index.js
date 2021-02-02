import React, { useState, useContext, useMemo } from 'react';
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
  const { dispatch, pageConfig, hoveringWidgetId } = store;

  const [isDragOver, setIsDragOver] = useState(false);

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    dispatch({
      type: actions.SET_HOVERING_WIDGET,
      payload: config.id
    });
  }

  const handleMouseOver = (e) => {
    e.stopPropagation();
    dispatch({
      type: actions.SET_HOVERING_WIDGET,
      payload: config.id
    });
  }

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    dispatch({
      type: actions.SET_HOVERING_WIDGET,
      payload: null
    });
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
      payload: pageConfig
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

  const hovering = hoveringWidgetId === config.id;

  const classes = useMemo(() => {
    let res = styles.widgetsContainer;
    if (isDragOver) res += ` ${styles.dragOver}`;
    if (hoveringWidgetId === config.id) res += ` ${styles.hover}`;
    if (className) res += ` ${className}`;
    return res;
  }, [config, className, isDragOver, hoveringWidgetId]);

  return (
    <div
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {
        hovering &&
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
