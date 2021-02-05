import React, { useMemo } from 'react';
import { Image as AntImage } from 'antd';
import defaultSettings from 'Src/config/defaultSettings';
import WidgetWrapper from 'Src/components/WidgetWrapper';

export default function Image({ config }) {

  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
  }, [config]);

  return (
    <WidgetWrapper config={config}>
      <AntImage {...finalSettings} />
    </WidgetWrapper >
  )
}
