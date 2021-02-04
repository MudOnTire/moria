import React, { useState, useContext, useMemo, Fragment } from 'react';
import { Button } from 'antd';
import Droppable from 'Src/components/dnd/Droppable';
import Dragable from 'Src/components/dnd/Dragable';
import { SettingFilled, DeleteFilled } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import WIDGET_IDs from 'Src/config/widgetIds';
import { queryWidget } from 'Src/config/widgets';
import { throttle, getTreeItem, moveTreeItem, insertTreeItem } from 'Src/uitls/fns';
import Divider from 'Src/components/dnd/Divider';
import Content from './content';

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
    dispatch({
      type: actions.SET_CURRENT_WIDGET_CONFIG,
      payload: config
    });
  }

  const handleDelete = (e) => {
    dispatch({
      type: actions.DELETE_WIDGET_CONFIG,
      payload: config.id
    });
  }

  /**
   * Drop widget class or widget instance 
   */
  const handleWidgetDrop = ({ type, id }) => {
    if (!type || !id) return;
    console.log('will drop', type, id);
    setIsDragOver(false);
    if (type === 'widgetClass') {
      const widgetId = id;
      const newiId = `${widgetId}_${new Date().valueOf()}`;
      if (!config.children) config.children = [];
      const child = {
        id: newiId,
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
    if (type === 'widgetInstance') {
      moveTreeItem(pageConfig.children, id, config.id);
      dispatch({
        type: actions.UPDATE_PAGE_CONFIG,
        payload: pageConfig
      });
    }
  }

  /**
   * Insert widget into children
   */
  const handleInsertWidget = ({ type, id }, index) => {
    if (!type || !id) return;
    console.log('will insert', type, id);
    if (type === 'widgetClass') {
      const widgetId = id;
      const newId = `${widgetId}_${new Date().valueOf()}`;
      const child = {
        id: newId,
        widgetId,
        settings: {}
      };
      if (widgetId === WIDGET_IDs.WIDGET_CONTAINER) {
        child.children = [];
      }
      config.children.splice(index, 0, child);
      dispatch({
        type: actions.UPDATE_PAGE_CONFIG,
        payload: pageConfig
      });
    }
    if (type === 'widgetInstance') {
      insertTreeItem(pageConfig.children, id, config.id, index);
      dispatch({
        type: actions.UPDATE_PAGE_CONFIG,
        payload: pageConfig
      });
    }
  }

  const handleDragStart = (e)=>{
    const data = {
      type: 'widgetInstance',
      id: config.id,
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
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
        onDragOver={throttle(handleDragOver, 1000)}
        onDragLeave={handleDragLeave}
        onDrop={handleWidgetDrop}
      >
        <Content settings={config.settings}>
          {
            config?.children?.map((c, index) => {
              const widget = queryWidget(c.widgetId);
              if (!widget) return null;
              return (
                <Fragment key={c.id}>
                  {
                    index === 0 &&
                    <Divider
                      containerSettings={config.settings}
                      onDrop={data => { handleInsertWidget(data, index) }}
                    />
                  }
                  <widget.component config={c} />
                  <Divider
                    containerSettings={config.settings}
                    onDrop={data => { handleInsertWidget(data, index + 1) }}
                  />
                </Fragment>
              )
            })
          }
        </Content>
      </Droppable>
    </Dragable>
  )
}
