import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';
import widgets from 'Src/config/widgets.js';

import styles from './styles.module.scss';

export default function WidgetList() {

  const handleDragStart = (e, widgetId) => {
    e.dataTransfer.setData('text/plain', widgetId);
    console.log('drag', widgetId);
  }

  return (
    <div className={styles.widgetList}>
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
                        key={w.widgetId}
                        className={styles.compItem}
                        onDragStart={(e) => handleDragStart(e, w.widgetId)}
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
