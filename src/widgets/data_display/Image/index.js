import React from 'react';
import { Image as AntImage } from 'antd';
import WidgetWrapper from 'Src/widgets/WidgetWrapper';

export default function Image({ config }) {
  return (
    <WidgetWrapper widgetConfig={config}>
      <AntImage
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </WidgetWrapper >
  )
}
