import React, { useMemo } from 'react';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import GridCell from './GridCell';
import defaultSettings from 'Src/config/defaultSettings';

import styles from './styles.module.scss';

export default function Grid({ config }) {

  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
  }, [config]);

  const { rows, cols, children } = finalSettings;

  const handleDrop = (data) => {
    console.log('handle drop', data);
  }

  return (
    <WidgetWrapper config={config}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${rows}, 1fr)`,
        }}>
        {
          [...Array(rows * cols).keys()].map((index) => {
            return (
              <GridCell onDrop={handleDrop} key={index}>
                {children?.length > index && children[index]}
              </GridCell>
            )
          })
        }
      </div>
    </WidgetWrapper>
  )
}
