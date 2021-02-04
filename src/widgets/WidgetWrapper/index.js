import React from 'react';
import Dragable from 'Src/components/dnd/Dragable';

export default function WidgetWrapper({ children, widgetConfig = {}, ...rest }) {

  const handleDragStart = (e) => {
    const data = {
      type: 'widgetInstance',
      id: widgetConfig.id,
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  return (
    <Dragable onDragStart={handleDragStart} {...rest}>
      {children}
    </Dragable>
  )
}
