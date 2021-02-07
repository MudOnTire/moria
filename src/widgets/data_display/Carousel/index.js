import React, { useMemo } from 'react';
import { Carousel as AntCarousel } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';

import styles from './styles.module.scss';

export default function Image({ config }) {

  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
  }, [config]);

  const antSettings = useMemo(() => {
    const antSettingIds = settingSchemas[config.widgetId].filter(s => s.antSetting).map(s => s.id);
    const result = {};
    for (const key in finalSettings) {
      if (antSettingIds.includes(key)) {
        result[key] = finalSettings[key]
      }
    }
    return result;
  }, [finalSettings]);

  const { count, slides, height } = finalSettings;

  return (
    <WidgetWrapper config={config}>
      <AntCarousel {...antSettings}>
        {
          slides?.map((slide, i) => {
            return (
              <div key={i} className={styles.slide}>
                <div className={styles.content} style={{ height }}>
                  <img src={slide} />
                </div>
              </div>
            )
          })
        }
      </AntCarousel>
    </WidgetWrapper >
  )
}