import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { context, actions } from 'Src/store';

import styles from './styles.module.scss';

export default function WidgetsContainer({ id, className = '', children, ...rest }) {

  const store = useContext(context);
  const { dispatch, configedContainerId } = store;

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
      {children}
    </div>
  )
}
