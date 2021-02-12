import React, { useMemo, useEffect, useState } from 'react';
import { Form as AntForm, Input, InputNumber, Select, Switch, DatePicker } from 'antd';
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

  const { padding, labelCol } = finalSettings;

  return (
    <WidgetWrapper config={config}>
      <AntForm
        {...antSettings}
        labelCol={{ span: labelCol }}
        style={{ padding }}
      >
        {
          finalSettings?.items?.map(item => {
            return (
              <AntForm.Item label={item.label} name={item.name} key={item.key}>
                {
                  item.type === 'input' &&
                  <Input />
                }
                {
                  item.type === 'inputNumber' &&
                  <InputNumber />
                }
                {
                  item.type === 'select' &&
                  <Select>
                    {
                      item.options?.map(option => {
                        return <Select.Option key={option.value}>{option.label}</Select.Option>
                      })
                    }
                  </Select>
                }
                {
                  item.type === 'datepicker' &&
                  <DatePicker />
                }
                {
                  item.type === 'switch' &&
                  <Switch />
                }
                {
                  item.type === 'textarea' &&
                  <Input.TextArea />
                }
              </AntForm.Item>
            )
          })
        }
      </AntForm>
    </WidgetWrapper >
  )
}
