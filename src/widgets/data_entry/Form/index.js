import React, { useMemo, useEffect, useState } from 'react';
import { Form as AntForm } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import request from 'Src/uitls/request';
import { createFunction } from 'Src/uitls/fns';

export default function Form({ config }) {

  const finalSettings = useMemo(() => {
    const result = {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
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

  return (
    <WidgetWrapper config={config}>
      <AntForm {...antSettings} />
    </WidgetWrapper >
  )
}
