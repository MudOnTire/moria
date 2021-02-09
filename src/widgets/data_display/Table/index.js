import React, { useMemo, useEffect, useState } from 'react';
import { Table as AntTable } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import request from 'Src/uitls/request';

export default function Table({ config }) {

  const [data, setData] = useState([]);

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

  // api start
  useEffect(() => {
    const fetchData = async () => {
      const res = await request.get(finalSettings.api);
      console.log('table res', res);
      if (res?.data) {
        setData(res.data);
      }
    }
    fetchData();
  }, [finalSettings.api]);
  // api end

  return (
    <WidgetWrapper config={config}>
      <AntTable
        {...antSettings}
        columns={[...(finalSettings.columns || [])]}
        dataSource={data}
        rowKey={finalSettings.rowKey}
      />
      {
        <>
          {/* <h3>Config:{JSON.stringify(config)}</h3>
          <h3>defaultSettings:{JSON.stringify(defaultSettings[config.widgetId])}</h3> */}
          <h3>FinalSettings:{JSON.stringify(finalSettings)}</h3>
        </>
      }
    </WidgetWrapper >
  )
}
