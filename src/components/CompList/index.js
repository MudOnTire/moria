import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';
import widgets from 'Src/config/widgets.js';

import styles from './styles.module.scss';

export default function CompList() {
  return (
    <div className={styles.compList}>
      {
        widgets && widgets.map(cate => {
          return (
            <div className={styles.sec} key={cate.category}>
              <h4 className={styles.secTitle}>{cate.category}</h4>
              <div className={styles.secBody}>
                {
                  cate.list && cate.list.map(w => {
                    return (
                      <Dragable
                        key={w.id}
                        className={styles.compItem}
                        widgetId={w.id}
                      >
                        {w.name}
                      </Dragable>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
