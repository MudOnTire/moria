import React, { useEffect, useContext } from 'react';
import { context, actions } from 'Src/store';
import AssetDrawer from 'Src/components/AssetDrawer';
import Draft from 'Src/components/Draft';
import SettingDrawer from 'Src/components/SettingDrawer';

import styles from './styles.module.scss';

export default function Editor() {

  const store = useContext(context);
  const { dispatch } = store;

  useEffect(() => {
    dispatch({
      type: actions.SET_EDIT_MODE,
      payload: 'edit'
    });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      dispatch({
        type: actions.SET_SAVE_TRIGGER,
        payload: new Date().valueOf()
      });
    }
  }

  // listen events start
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  // listen events end

  return (
    <div className={styles.editor}>
      <AssetDrawer />
      <Draft />
      <SettingDrawer />
    </div>
  )
}
