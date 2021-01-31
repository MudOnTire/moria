import React, { useState } from 'react'
import CompList from 'Src/components/CompList';
import Draft from 'Src/components/Draft';
import SettingDrawer from 'Src/components/SettingDrawer';

import styles from './styles.module.scss';

export default function Editor() {

  const [showSettingDrawer, setShowSettingDrawer] = useState(true);

  return (
    <div className={styles.editor}>
      <CompList />
      <Draft />
      <SettingDrawer
        visible={showSettingDrawer}
        onClose={() => { setShowSettingDrawer(false); }}
      />
    </div>
  )
}
