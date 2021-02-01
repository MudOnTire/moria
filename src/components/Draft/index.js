import React, { useContext } from 'react';
import { context } from 'Src/store';
import WidgetsContainer from 'Src/components/WidgetsContainer';

import styles from './styles.module.scss';

export default function Draft() {

  const store = useContext(context);
  const { pageConfig, dispatch } = store;

  console.log('page config', pageConfig);

  return (
    <WidgetsContainer id="root" className={styles.draft}>
      {
        pageConfig?.length > 0 && pageConfig.map(c => {
          return (
            <c.component key={c.key} />
          )
        })
      }
    </WidgetsContainer>
  )
}
