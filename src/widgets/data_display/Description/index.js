import React, { useMemo, useEffect, useState, ReactNode } from 'react';
import { Descriptions as AntDescriptions, message } from 'antd';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import request from 'Src/uitls/request';
import { createFunction, parseLink } from 'Src/uitls/fns';

export default function Description({ config }) {
  const location = useLocation();
  const [data, setData] = useState(null);

  const finalSettings = useMemo(() => {
    const result = {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
    result.items?.forEach(item => {
      if (item.renderStr) {
        item.render = createFunction(item.renderStr);
      } else {
        item.render = null;
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
      if (!finalSettings.api) return;
      console.log('location', location);
      const query = qs.parse(location.search);
      const api = parseLink(finalSettings.api, query);
      try {
        const res = await request.get(api);
        if (res?.data) {
          setData(res.data);
        } else {
          setData(null);
        }
      } catch (err) {
        message.error(err?.message || 'Fetch data failed!');
      }
    }
    fetchData();
  }, [finalSettings.api]);
  // api end

  const renderItem = (item) => {
    if (!data) return null;
    if (item.render) {
      return item.render(data);
    }
    const value = data[item.property];
    const type = typeof value;
    if (['string', 'number', 'boolean'].includes(type)) {
      return value;
    }
    return null;
  }

  return (
    <WidgetWrapper config={config}>
      <AntDescriptions {...antSettings}>
        {
          finalSettings.items?.map(item => {
            return (
              <AntDescriptions.Item label={item.label} key={item.property}>
                {
                  renderItem(item)
                }
              </AntDescriptions.Item>
            )
          })
        }
      </AntDescriptions>
    </WidgetWrapper >
  )
}
