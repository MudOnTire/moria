import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';

import styles from './styles.module.scss';

export default function WidgetItem({ widget = {} }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', widget.widgetId);
    console.log('drag', widget.widgetId);
  }

  return (
    <Dragable
      key={widget.widgetId}
      className={styles.widgetItem}
      onDragStart={handleDragStart}
    >
      {w.name}
    </Dragable>
  )
}
