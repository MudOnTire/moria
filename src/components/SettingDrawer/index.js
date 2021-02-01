import React, { useContext } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';

import styles from './styles.module.scss';

export default function SettingDrawer() {

  const store = useContext(context);
  const { dispatch, configedContainerId } = store;

  const close = () => {
    dispatch({
      type: actions.SET_CONFIG_CONTAINER,
      payload: null
    });
  }

  return (
    <div className={`${styles.settingDrawer} ${configedContainerId ? styles.visible : styles.hidden}`}>
      <div className={styles.content}>
        this is content
      </div>
      <Button
        type="text"
        className={styles.closeBtn}
        icon={<CloseOutlined />}
        onClick={close}
      />
    </div>
  )
}
