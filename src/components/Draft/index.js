import React, { useContext } from 'react';
import { context } from 'Src/store';
import WidgetsContainer from 'Src/widgets/container/WidgetsContainer';

import styles from './styles.module.scss';

export default function Draft() {

  const store = useContext(context);
  const { pageConfig, currentWidgetConfig } = store;


  return (
    <WidgetsContainer
      onDoubleClick={() => {
        console.log('pageConfig', pageConfig);
      }}
      className={`${styles.draft} ${currentWidgetConfig && styles.showSettingDrawer}`}
      config={pageConfig}
    />
  )
}
