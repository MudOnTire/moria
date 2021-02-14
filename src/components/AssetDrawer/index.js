import React, { useState, useContext } from 'react';
import { Tabs, Button } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import PageList from '../PageList';
import WidgetList from '../WidgetList';
import { context, actions } from 'Src/store';

import styles from './styles.module.scss';

const { TabPane } = Tabs;

export default function AssetDrawer() {

  const store = useContext(context);
  const { dispatch, showAssetDrawer } = store;

  const toggle = () => {
    dispatch({
      type: actions.SHOW_ASSET_DRAWER,
      payload: !showAssetDrawer
    });
  }

  return (
    <div className={`${styles.assetDrawer} ${showAssetDrawer ? styles.expanded : styles.collapsed}`}>
      <Tabs defaultActiveKey="1" className={styles.tabs}>
        <TabPane tab="Pages" key="1">
          <PageList />
        </TabPane>
        <TabPane tab="Widgets" key="2">
          <WidgetList />
        </TabPane>
      </Tabs>

      <Button
        className={styles.toggleBtn}
        type="text"
        icon={
          showAssetDrawer ?
            <DoubleLeftOutlined style={{ color: "#999" }} />
            :
            <DoubleRightOutlined style={{ color: "#999" }} />
        }
        onClick={toggle}
      />
    </div>
  )
}
