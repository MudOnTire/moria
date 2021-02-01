import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import Droppable from 'Src/components/dnd/Droppable';
import { SettingFilled } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import { queryWidget } from 'Src/config/widgets';

import styles from './styles.module.scss';

export default function WidgetsContainer({
  className = '',
  config = {},
  children,
  ...rest
}) {

  const store = useContext(context);
  const { dispatch, currentWidgetConfig, pageConfig } = store;

  const [showSettingBtn, setShowSettingBtn] = useState(false);

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setShowSettingBtn(true);
  }

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setShowSettingBtn(false);
  }

  const handleSetting = (e) => {
    if (!config) return;
    console.log('setting', config);
    dispatch({
      type: actions.SET_CURRENT_WIDGETCONFIG,
      payload: config
    });
  }

  const handleWidgetDrop = (widgetId) => {
    if (!widgetId) return;
    const pageConfigCy = { ...pageConfig };
    const id = `${widgetId}_${new Date().valueOf()}`;
    if (!config.children) config.children = [];
    config.children.push({
      id,
      widgetId,
      children: [],
      settings: {}
    });
    dispatch({
      type: actions.UPDATE_PAGE_CONFIG,
      payload: pageConfigCy
    });
  }

  return (
    <div
      className={`${styles.widgetsContainer} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {
        showSettingBtn &&
        <Button
          type="primary"
          className={styles.settingBtn}
          icon={<SettingFilled />}
          onClick={handleSetting}
        />
      }
      <Droppable onDrop={handleWidgetDrop}>
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
