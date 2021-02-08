import React, { useContext, useEffect } from 'react';
import { context, actions } from 'Src/store';
import WidgetsContainer from 'Src/widgets/container/WidgetsContainer';

import styles from './styles.module.scss';

export default function Preview() {

  const store = useContext(context);
  const { dispatch, pageConfig } = store;

  useEffect(() => {
    dispatch({
      type: actions.SET_EDIT_MODE,
      payload: 'preview'
    });
  }, []);

  return (
    <WidgetsContainer
      className={styles.preview}
      config={pageConfig}
      onDoubleClick={() => {
        console.log('pageConfig', pageConfig);
      }}
    />
  )
}
