import React, { useMemo, useEffect, useState } from 'react';
import { Table as AntTable } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import request from 'Src/uitls/request';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'User Id',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Body',
    dataIndex: 'body',
    key: 'body',
  }
];

export default function Image({ config }) {

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
  const fetchData = async () => {
    const res = await request.get(finalSettings.api);
    console.log('table res', res);
    if (res?.data) {
      setData(res.data);
    }
  }

  useEffect(fetchData, [finalSettings.api]);
  // api end

  return (
    <WidgetWrapper config={config}>
      <AntTable
        columns={columns}
        dataSource={data}
        {...antSettings}
      />
    </WidgetWrapper >
  )
}
