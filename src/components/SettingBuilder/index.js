import React, { useMemo, useContext, useEffect, use } from 'react';
import {
  Form,
  Select,
  Input,
  Switch,
  InputNumber
} from 'antd';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import { context, actions } from 'Src/store';
import WIDGET_IDs from 'Src/config/widgetIds';

const { Option } = Select;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

export default function SettingBuilder({
  id,
  widgetId,
  settings = {}
}) {

  console.log('builder settings', settings);

  const store = useContext(context);
  const { dispatch } = store;

  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    const result = {
      ...defaultSettings[widgetId],
      ...settings
    }
    return result;
  }, [settings]);

  useEffect(() => {
    form.resetFields();
  }, [settings]);

  const handleValuesChange = (changedValue, allValues) => {
    console.log('value changed', changedValue, allValues);
    dispatch({
      type: actions.UPDATE_WIDGET_SETTINGS,
      payload: {
        id,
        settings: allValues
      }
    });
  }

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
    >
      {
        settingSchemas[widgetId]?.map(schema => {
          if (schema.type === 'string' || (Array.isArray(schema.type) && schema.type.includes('string'))) {
            return (
              <Form.Item
                label={schema.label || schema.id}
                name={schema.id}
                key={schema.id}
              >
                <Input />
              </Form.Item>
            )
          }
          if (schema.type === 'number') {
            return (
              <>
                <Form.Item
                  label={schema.label || schema.id}
                  name={schema.id}
                  key={schema.id}
                >
                  <InputNumber />
                </Form.Item>
              </>
            )
          }
          if (schema.type === 'boolean') {
            return (
              <Form.Item
                label={schema.label || schema.id}
                name={schema.id}
                key={schema.id}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            )
          }
          if (schema.type === 'enum') {
            return (
              <Form.Item
                label={schema.label || schema.id}
                name={schema.id}
                key={schema.id}
              >
                <Select>
                  {
                    schema.options?.map(option => <Option value={option} key={option}>{option}</Option>)
                  }
                </Select>
              </Form.Item>
            )
          }
          if (schema.component) {
            if (widgetId === WIDGET_IDs.DATA_DISPLAY_CAROUSEL && schema.id === 'slides') {
              return (
                <Form.Item
                  label={schema.label || schema.id}
                  name={schema.id}
                  key={schema.id}
                >
                  <schema.component count={initialValues.count} />
                </Form.Item>
              )
            }
          }
        })
      }
    </Form>
  )
}
