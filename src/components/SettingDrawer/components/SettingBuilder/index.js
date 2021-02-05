import React, { useMemo, useContext, useEffect } from 'react';
import {
  Form,
  Select,
  input
} from 'antd';
import WIDGET_IDs from 'Src/config/widgetIds';
import { context, actions } from 'Src/store';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function SettingBuilder({
  id,
  settings = {},
  defaultSettings = {},
  settingSchema = []
}) {

  const store = useContext(context);
  const { dispatch } = store;

  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return {
      ...defaultSettings[WIDGET_IDs.WIDGET_CONTAINER],
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
        settingSchema.map(schema => {
          if (schema.type === 'string') {
            <Form.Item
              label={schema.label || schema.id}
              name={schema.id}
            >
              <Input />
            </Form.Item>
          }
        })
      }
    </Form>
  )
}
