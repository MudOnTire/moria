import React from 'react';
import WidgetList from 'Src/components/WidgetList';
import Draft from 'Src/components/Draft';
import SettingDrawer from 'Src/components/SettingDrawer';

import styles from './styles.module.scss';

export default function Editor() {

  return (
    <div className={styles.editor}>
      <WidgetList />
      <Draft />
      <SettingDrawer />
    </div>
  )
}
