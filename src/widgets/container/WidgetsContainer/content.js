import React, { useMemo } from 'react';
import WIDGET_IDs from 'Src/config/widgetIds';
import defaultSettings from 'Src/config/defaultSettings';

import styles from './content.module.scss';

export default function Content({ children, settings = {} }) {

  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[WIDGET_IDs.WIDGET_CONTAINER],
      ...settings
    }
  }, [settings]);

  const {
    height,
    flexDirection,
    justifyContent,
    alignItems,
  } = finalSettings;

  return (
    <div
      className={styles.content}
      style={{
        height,
        flexDirection,
        justifyContent,
        alignItems
      }}
    >
      {children}
    </div>
  )
}
