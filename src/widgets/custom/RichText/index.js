import React, { useMemo } from 'react';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';

import styles from './styles.module.scss';

export default function RichText({ config }) {
  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
  }, [config]);

  const { content } = finalSettings;

  return (
    <WidgetWrapper config={config}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </WidgetWrapper>
  )
}
