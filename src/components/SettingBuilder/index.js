import React, { useMemo, useContext, useEffect, use } from 'react';
import {
  Form,
  Select,
  Input
} from 'antd';
import defaultSettings from 'Src/config/defaultSettings';
import settingSchemas from 'Src/config/settingSchemas';
import { context, actions } from 'Src/store';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function SettingBuilder({
  id,
  widgetId,
  settings = {}
}) {

  const store = useContext(context);
  const { dispatch } = store;

  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return {
      ...defaultSettings[widgetId],
      ...settings
    }
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
        settingSchemas[widgetId].map(schema => {
          if (schema.type === 'string') {
            return (
              <Form.Item
                label={schema.label || schema.id}
                name={schema.id}
              >
                <Input />
              </Form.Item>
            )
          }
          if (schema.type === 'enum') {
            return (
              <Form.Item
                label={schema.label || schema.id}
                name={schema.id}
              >
                <Select>
                  {
                    schema.options.map(option => <Option value={option} key={option}>{option}</Option>)
                  }
                </Select>
              </Form.Item>
            )
          }
        })
      }
    </Form>
  )
}
