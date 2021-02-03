import React from 'react';
import widgets from 'Src/config/widgets.js';
import Dragable from 'Src/components/dnd/Dragable';

import styles from './styles.module.scss';

function WidgetItem({ widget = {} }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', widget.widgetId);
    console.log('drag', widget.widgetId);
  }

  return (
    <Dragable
      className={styles.widgetItem}
      onDragStart={handleDragStart}
    >
      {widget.name}
    </Dragable>
  )
}

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
