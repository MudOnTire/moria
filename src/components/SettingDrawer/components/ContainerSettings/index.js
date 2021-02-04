import React, { useMemo, useContext, useEffect } from 'react';
import {
  Form,
  Select
} from 'antd';
import WIDGET_IDs from 'Src/config/widgetIds';
import defaultSettings from 'Src/config/widgetsDefault';
import { context, actions } from 'Src/store';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function ContainerSettings({ id, settings = {} }) {
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

  console.log('initialValues', initialValues);

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
      <Form.Item
        label="Flex direction"
        name="flexDirection"
      >
        <Select placeholder="Select a direction">
          <Option value="row">Row</Option>
          <Option value="column">Column</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}
