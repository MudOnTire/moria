import React, { useContext, useMemo } from 'react';
import { context } from 'Src/store';
import { Empty } from 'antd';
import WidgetsContainer from 'Src/widgets/container/WidgetsContainer';
import TopBar from './TopBar';

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
  const { pageConfig, configingWidgetId, deviceType, currentPage } = store;

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
    <div className={`${styles.draftContainer} ${configingWidgetId && styles.showSettingDrawer}`}>
      <TopBar />
      {
        currentPage ?
          <WidgetsContainer
            onDoubleClick={() => {
              console.log('pageConfig', pageConfig);
            }}
            className={styles.draft}
            config={pageConfig}
            style={style}
          />
          :
          <Empty description="Please select a page first" />
      }
    </div>
  )
}
