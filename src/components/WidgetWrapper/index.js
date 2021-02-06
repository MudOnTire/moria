import React, { useContext, useMemo } from 'react';
import { Button } from 'antd';
import Dragable from 'Src/components/dnd/Dragable';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';

import styles from './styles.module.scss';

export default function WidgetWrapper({
  children,
  className,
  config = {}, // widget config
  ...rest
}) {

  const store = useContext(context);
  const { dispatch, pageConfig, hoveringWidgetId, configingWidgetId } = store;

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
    dispatch({
      type: actions.SET_CONFIGING_WIDGET,
      payload: config.id
    });
  }

  const handleDelete = (e) => {
    dispatch({
      type: actions.DELETE_WIDGET_CONFIG,
      payload: config.id
    });
  }

  const handleDragStart = (e) => {
    const data = {
      type: 'widgetInstance',
      id: config.id,
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  const hovering = hoveringWidgetId === config.id;

  const classes = useMemo(() => {
    let res = styles.widgetWrapper;
    if (hoveringWidgetId === config.id) res += ` ${styles.hover}`;
    if (configingWidgetId === config.id) res += ` ${styles.beingConfig}`;
    if (className) res += ` ${className}`;
    return res;
  }, [config, className, hoveringWidgetId, configingWidgetId]);

  return (
    <Dragable
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onDragStart={handleDragStart}
      {...rest}
    >
      {
        hovering &&
        <div className={styles.actions}>
          <Button
            className={styles.actionBtn}
            type="text"
            icon={<SettingOutlined style={{ color: "#fff" }} />}
            onClick={handleSetting}
          />
          <Button
            className={styles.actionBtn}
            type="text"
            icon={<DeleteOutlined style={{ color: '#fff' }} />}
            onClick={handleDelete}
          />
        </div>
      }
      {children}
    </Dragable>
  )
}
