import React from 'react';
import { Tabs } from 'antd';
import WidgetList from '../WidgetList';

import styles from './styles.module.scss';

const { TabPane } = Tabs;

export default function AssetDrawer() {
  return (
    <div className={styles.assetDrawer}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Pages" key="1">
          Pages        
        </TabPane>
        <TabPane tab="Widgets" key="2">
          <WidgetList />
        </TabPane>
      </Tabs>
    </div>
  )
}
