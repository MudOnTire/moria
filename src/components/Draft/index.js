import React, { useContext } from 'react';
import Droppable from 'Src/components/dnd/Droppable';
import { context, actions } from 'Src/store';
import WidgetsContainer from 'Src/components/WidgetsContainer';

import styles from './styles.module.scss';

export default function Draft() {

  const store = useContext(context);
  const { pageConfig, dispatch } = store;

  console.log('page config', pageConfig);

  return (
    <div className={styles.draft}>
      <Droppable>
        <WidgetsContainer className={styles.header}>
          {
            pageConfig?.length > 0 && pageConfig.map(c => {
              return (
                <c.component key={c.id} />
              )
            })
          }
        </WidgetsContainer>
      </Droppable>
    </div>
  )
}
