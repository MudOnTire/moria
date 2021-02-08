import React, { useContext, useMemo } from 'react';
import { Button, Tooltip } from 'antd';
import { DesktopOutlined, TabletOutlined, MobileOutlined, FundViewOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import WidgetsContainer from 'Src/widgets/container/WidgetsContainer';

import styles from './styles.module.scss';

const SCREEN_WIDTHs = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px'
}

const SCREEN_HEIGHTs = {
  desktop: '100%',
  tablet: '1024px',
  mobile: '800px'
}

export default function Draft() {

  const store = useContext(context);
  const { dispatch, pageConfig, configingWidgetId, deviceType } = store;

  const changeScreenSize = (payload) => {
    dispatch({
      type: actions.SET_DEVICE_TYPE,
      payload
    });
  }

  const goPreview = () => {

  }

  const style = useMemo(() => {
    const result = {
      width: SCREEN_WIDTHs[deviceType],
      height: SCREEN_HEIGHTs[deviceType],
      flex: deviceType === 'desktop' ? '1' : 'unset',
      alignSelf: deviceType === 'desktop' ? 'unset' : 'center',
    };
    return result;
  }, [deviceType])


  return (
    <div 
      className={`${styles.draftContainer} ${configingWidgetId && styles.showSettingDrawer}`}
    >
      <div className={styles.draftActions}>
        <Tooltip title="Desktop">
          <Button
            type="text"
            icon={<DesktopOutlined />}
            onClick={() => { changeScreenSize('desktop') }}
          />
        </Tooltip>
        <Tooltip title="Tablet">
          <Button
            type="text"
            icon={<TabletOutlined />}
            onClick={() => { changeScreenSize('tablet') }}
          />
        </Tooltip>
        <Tooltip title="Mobile">
          <Button
            type="text"
            icon={<MobileOutlined />}
            onClick={() => { changeScreenSize('mobile') }}
          />
        </Tooltip>
        <Tooltip title="Preview">
          <Button
            type="text"
            icon={<FundViewOutlined />}
            onClick={goPreview}
          />
        </Tooltip>
      </div>
      <WidgetsContainer
        onDoubleClick={() => {
          console.log('pageConfig', pageConfig);
        }}
        className={styles.draft}
        config={pageConfig}
        style={style}
      />
    </div>
  )
}
