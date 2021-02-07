import React, { useContext, useMemo } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import SettingBuilder from 'Src/components/SettingBuilder';
import { getTreeItem } from 'Src/uitls/fns';

import styles from './styles.module.scss';

export default function SettingDrawer() {

  const store = useContext(context);
  const { dispatch, configingWidgetId } = store;

  // const widget = useMemo(() => {
  //   const treeItem = getTreeItem(pageConfig.children, configingWidgetId);
  //   if (!treeItem) return;
  //   return treeItem.item;
  // }, [configingWidgetId, pageConfig])

  const close = () => {
    dispatch({
      type: actions.SET_CONFIGING_WIDGET,
      payload: null
    });
  }

  return (
    <div className={`${styles.settingDrawer} ${configingWidgetId ? styles.visible : styles.hidden}`}>
      <div className={styles.content}>
        {
          configingWidgetId &&
          <SettingBuilder id={configingWidgetId}/>
        }
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
