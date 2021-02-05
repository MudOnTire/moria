import React from 'react';
import { Image as AntImage } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';

export default function Image({ config }) {
  return (
    <WidgetWrapper config={config}>
      <AntImage
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </WidgetWrapper >
  )
}
