import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import Droppable from 'Src/components/dnd/Droppable';
import { SettingFilled } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import { queryWidget } from 'Src/config/widgets';

import styles from './styles.module.scss';

export default function WidgetsContainer({ id, className = '', children, ...rest }) {

  const store = useContext(context);
  const { dispatch, configedContainerId, pageConfig } = store;

  const [showSettingBtn, setShowSettingBtn] = useState(false);

  const handleMouseEnter = (e) => {
    setShowSettingBtn(true);
  }

  const handleMouseLeave = (e) => {
    setShowSettingBtn(false);
  }

  const handleSetting = (e) => {
    if (!id) return;
    dispatch({
      type: actions.SET_CONFIG_CONTAINER,
      payload: id
    });
  }

  const handleWidgetDrop = (widgetId) => {
    if (!widgetId) return;
    const widget = queryWidget(widgetId);
    if (!widget) return;
    const pageConfigCy = { ...pageConfig };
    let config = pageConfigCy;
    console.log('page config', pageConfig);
    const idPath = id.split('.');
    while (idPath.length > 0) {
      config = config[idPath.pop()];
    }
    console.log('widget drop', widgetId, ' in', id);
    console.log('config', config);
    const key = `${widget.id}_${new Date().valueOf()}`;
    config.children.push({
      ...widget,
      key
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
      </Droppable>
    </div>
  )
}
