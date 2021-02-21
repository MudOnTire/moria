import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';

import styles from './styles.module.scss';

const initOptions = {
  title: {
    text: 'Solar Employment Growth by Sector, 2010-2016'
  },

  subtitle: {
    text: 'Source: thesolarfoundation.com'
  },

  yAxis: {
    title: {
      text: 'Number of Employees'
    }
  },

  xAxis: {
    accessibility: {
      rangeDescription: 'Range: 2010 to 2017'
    }
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },

  series: [{
    name: 'Installation',
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
    name: 'Manufacturing',
    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
  }, {
    name: 'Sales & Distribution',
    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
  }, {
    name: 'Project Development',
    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
  }, {
    name: 'Other',
    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
};

export default function Line({ config }) {
  const container = useRef(null);
  const chartRef = useRef(null);

  const [chartOptions, setChartOptions] = useState(initOptions);

  useEffect(() => {
    const finalSettings = {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
    const { title } = finalSettings;
    setChartOptions({
      title: {
        text: title
      }
    });
  }, [config.settings]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      chartRef.current.chart.reflow();
    });
    resizeObserver.observe(container.current);
  }, []);

  return (
    <WidgetWrapper config={config}>
      <div ref={container}>
        <HighchartsReact
          ref={chartRef}
          options={chartOptions}
          highcharts={Highcharts}
        />
      </div>
    </WidgetWrapper >
  )
}