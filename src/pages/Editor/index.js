import React, { useEffect, useContext } from 'react';
import { context, actions } from 'Src/store';
import WidgetList from 'Src/components/WidgetList';
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

  return (
    <div className={styles.editor}>
      <WidgetList />
      <Draft />
      <SettingDrawer />
    </div>
  )
}
