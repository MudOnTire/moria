import React, { useContext } from 'react';
import { context } from 'Src/store';
import WidgetsContainer from 'Src/components/WidgetsContainer';

import styles from './styles.module.scss';

export default function Draft() {

  const store = useContext(context);
  const { pageConfig, currentWidgetConfig } = store;

  console.log('pageConfig', pageConfig);

  return (
    <WidgetsContainer
      className={`${styles.draft} ${currentWidgetConfig && styles.showSettingDrawer}`}
      config={pageConfig}
    />
  )
}
