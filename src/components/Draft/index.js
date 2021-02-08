import React, { useContext } from 'react';
import { Button } from 'antd';
import { DesktopOutlined, TabletOutlined, MobileOutlined, FundViewOutlined } from '@ant-design/icons';
import { context } from 'Src/store';
import WidgetsContainer from 'Src/widgets/container/WidgetsContainer';

import styles from './styles.module.scss';

export default function Draft() {

  const store = useContext(context);
  const { pageConfig, configingWidgetId } = store;

  const changeScreenSize = () => {

  }

  const goPreview = () => {

  }

  return (
    <div className={styles.draftContainer}>
      <div className={styles.draftActions}>
        <Button
          className={styles.actionBtn}
          type="text"
          icon={<DesktopOutlined />}
          onClick={changeScreenSize}
        />
        <Button
          className={styles.actionBtn}
          type="text"
          icon={<TabletOutlined />}
          onClick={changeScreenSize}
        />
        <Button
          className={styles.actionBtn}
          type="text"
          icon={<MobileOutlined />}
          onClick={changeScreenSize}
        />
        <Button
          className={styles.actionBtn}
          type="text"
          icon={<FundViewOutlined />}
          onClick={goPreview}
        />
      </div>
      <WidgetsContainer
        onDoubleClick={() => {
          console.log('pageConfig', pageConfig);
        }}
        className={`${styles.draft} ${configingWidgetId && styles.showSettingDrawer}`}
        config={pageConfig}
      />
    </div>
  )
}
