import React from 'react';
import WidgetItem from 'Src/components/WidgetList';
import widgets from 'Src/config/widgets.js';

import styles from './styles.module.scss';

export default function WidgetList() {
  return (
    <div className={styles.widgetList}>
      {
        widgets && widgets.map(cate => {
          return (
            <div className={styles.sec} key={cate.category}>
              <h4 className={styles.secTitle}>{cate.category}</h4>
              <div className={styles.secBody}>
                {
                  cate.list && cate.list.map(w => <WidgetItem key={w.widgetId} widget={w} />)
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
