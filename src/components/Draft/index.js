import React, { useContext } from 'react';
import { context } from 'Src/store';
import WidgetsContainer from 'Src/components/WidgetsContainer';

import styles from './styles.module.scss';

export default function Draft() {

  const store = useContext(context);
  const { pageConfig, dispatch } = store;

  console.log('page config', pageConfig);

  return (
    <WidgetsContainer
      className={styles.draft}
      config={pageConfig}
    />
  )
}
