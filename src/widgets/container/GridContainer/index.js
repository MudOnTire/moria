import React, { useMemo } from 'react';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import WidgetContainer from 'Src/widgets/container/WidgetsContainer';
import defaultSettings from 'Src/config/defaultSettings';

import styles from './styles.module.scss';

export default function Grid({ config }) {

  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
  }, [config]);

  const { rows, cols } = finalSettings;

  return (
    <WidgetWrapper config={config}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${rows}, 1fr)`,
        }}>
        {
          [...Array(rows * cols).keys()].map(() => {
            return <WidgetContainer draggable={false} />
          })
        }
      </div>
    </WidgetWrapper>
  )
}
