import React, { useContext, useEffect, useState } from 'react';
import { context, actions } from 'Src/store';
import WidgetsContainer from 'Src/widgets/container/WidgetsContainer';

import styles from './styles.module.scss';

export default function Preview({ page }) {

  const store = useContext(context);
  const { dispatch, pageConfig } = store;

  const [config, setConfig] = useState(null)

  useEffect(() => {
    setConfig(page ? page?.config : pageConfig);
    dispatch({
      type: actions.SET_EDIT_MODE,
      payload: 'preview'
    });
  }, []);

  return (
    <>
      {
        config &&
        <WidgetsContainer
          className={styles.preview}
          config={config}
          onDoubleClick={() => {
            console.log('pageConfig', config);
          }}
        />
      }
    </>
  )
}
