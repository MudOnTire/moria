import React, { useContext, useMemo } from 'react';
import { Button } from 'antd';
import Dragable from 'Src/components/dnd/Dragable';
import { SettingOutlined, DeleteOutlined, CaretUpOutlined, CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import { moveTreeItemInSiblings } from 'Src/uitls/fns';

import styles from './styles.module.scss';

export default function WidgetWrapper({
  children,
  className,
  config = {}, // widget config
  containerSettings = {}, // parent container's settings
  draggable = true,
  ...rest
}) {

  const store = useContext(context);
  const { dispatch, pageConfig, hoveringWidgetId, configingWidgetId, editMode } = store;

  const preview = editMode === 'preview';

  const handleMouseOver = (e) => {
    if (preview) return;
    e.stopPropagation();
    e.preventDefault();
    if (hoveringWidgetId === config.id) return;
    dispatch({
      type: actions.SET_HOVERING_WIDGET,
      payload: config.id
    });
  }

  const handleMouseLeave = (e) => {
    if (preview) return;
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
    if (preview) return;
    const data = {
      type: 'widgetInstance',
      id: config.id,
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  const moveWidget = (steps) => {
    moveTreeItemInSiblings(pageConfig.children, config.id, steps);
    dispatch({
      type: actions.UPDATE_PAGE_CONFIG,
      payload: pageConfig
    });
  }

  const hovering = hoveringWidgetId === config.id;

  const classes = useMemo(() => {
    let res = styles.widgetWrapper;
    if (editMode === 'edit') {
      if (hoveringWidgetId === config.id) res += ` ${styles.hover}`;
      if (configingWidgetId === config.id) res += ` ${styles.beingConfig}`;
    }
    if (className) res += ` ${className}`;
    return res;
  }, [config, className, hoveringWidgetId, configingWidgetId, editMode]);


  const { flexDirection } = containerSettings;

  return (
    <Dragable
      className={classes}
      dragEnabled={editMode === 'edit' || draggable}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onDragStart={handleDragStart}
      {...rest}
    >
      {
        hovering && editMode === 'edit' &&
        <div className={styles.actions}>
          <Button
            className={styles.actionBtn}
            type="text"
            icon={flexDirection === 'row' ? <CaretLeftOutlined /> : <CaretUpOutlined />}
            onClick={() => { moveWidget(-1) }}
          />
          <Button
            className={styles.actionBtn}
            type="text"
            icon={flexDirection === 'row' ? <CaretRightOutlined /> : <CaretDownOutlined />}
            onClick={() => { moveWidget(1) }}
          />
          <Button
            className={styles.actionBtn}
            type="text"
            icon={<SettingOutlined />}
            onClick={handleSetting}
          />
          <Button
            className={styles.actionBtn}
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          />
        </div>
      }
      {children}
    </Dragable>
  )
}
