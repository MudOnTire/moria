import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table as AntTable } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import request from 'Src/uitls/request';
import { createFunction, parseLink } from 'Src/uitls/fns';

export default function Table({ config }) {

  const [data, setData] = useState([]);

  const finalSettings = useMemo(() => {
    const result = {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
    result.columns?.forEach(column => {
      if (column.renderStr) {
        if (column.link) {
          column.render = (value, record) => {
            const link = parseLink(column.link, record);
            return (
              <Link to={link}>{createFunction(column.renderStr)(value, record)}</Link>
            )
          }
        } else {
          column.render = createFunction(column.renderStr);
        }
      } else {
        if (column.link) {
          column.render = (value, record) => {
            const link = parseLink(column.link, record);
            return (
              <Link to={link}>{value}</Link>
            )
          }
        } else {
          column.render = null;
        }
      }
    });
    return result;
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
      if (res?.data && Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
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
      {/* {
        <>
          <h3>Config:{JSON.stringify(config)}</h3>
          <h3>defaultSettings:{JSON.stringify(defaultSettings[config.widgetId])}</h3>
          <h3>FinalSettings:{JSON.stringify(finalSettings)}</h3>
        </>
      } */}
    </WidgetWrapper >
  )
}
