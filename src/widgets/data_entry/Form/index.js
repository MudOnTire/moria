import React, { useMemo, useEffect, useState, Fragment } from 'react';
import { Form as AntForm, Input, InputNumber, Select, Switch, DatePicker } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import request from 'Src/uitls/request';
import { createFunction } from 'Src/uitls/fns';

const FormItem = AntForm.Item;

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
            const { label, name } = item;
            const formItemProps = {
              label,
              name
            }

            return (
              <Fragment key={name}>
                {
                  item.type === 'input' &&
                  <FormItem {...formItemProps}>
                    <Input />
                  </FormItem>
                }
                {
                  item.type === 'inputNumber' &&
                  <FormItem {...formItemProps}>
                    <InputNumber />
                  </FormItem>
                }
                {
                  item.type === 'select' &&
                  <FormItem {...formItemProps}>
                    <Select>
                      {
                        item.options?.map(option => {
                          return <Select.Option key={option.value}>{option.label}</Select.Option>
                        })
                      }
                    </Select>
                  </FormItem>
                }
                {
                  item.type === 'datepicker' &&
                  <FormItem {...formItemProps}>
                    <DatePicker />
                  </FormItem>
                }
                {
                  item.type === 'switch' &&
                  <FormItem {...formItemProps} valuePropName='checked'>
                    <Switch />
                  </FormItem>
                }
                {
                  item.type === 'textarea' &&
                  <FormItem {...formItemProps}>
                    <Input.TextArea />
                  </FormItem>
                }
              </Fragment>
            )
          })
        }
      </AntForm>
      {
        // JSON.stringify(finalSettings)
      }
    </WidgetWrapper >
  )
}
