import React from 'react';
import CompList from 'Src/components/CompList';
import Draft from 'Src/components/Draft';
import SettingDrawer from 'Src/components/SettingDrawer';

import styles from './styles.module.scss';

export default function Editor() {

  return (
    <div className={styles.editor}>
      <CompList />
      <Draft />
      <SettingDrawer />
    </div>
  )
}
