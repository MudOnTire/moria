import React, { useMemo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import { createFunction } from 'Src/uitls/fns';

import styles from './styles.module.scss';

export default function Raw({ config }) {
  const container = useRef(null);
  const chartRef = useRef(null);

  const options = useMemo(() => {
    const settings = {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
    let result = {};
    try {
      const fn = createFunction(settings.options);
      if (fn) result = fn();
    } catch (err) {
      console.log('JSON parse error', err);
    }
    return result;
  }, [config.settings])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      chartRef?.current?.chart?.reflow();
    });
    resizeObserver.observe(container.current);
  }, []);

  return (
    <WidgetWrapper config={config}>
      <div ref={container}>
        <HighchartsReact
          ref={chartRef}
          options={options}
          highcharts={Highcharts}
        />
      </div>
    </WidgetWrapper >
  )
}