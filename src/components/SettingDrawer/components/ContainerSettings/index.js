import React, { useMemo } from 'react';
import {
  Form,
  Select
} from 'antd';
import WIDGET_IDs from 'Src/config/widgetIds';
import defaultSettings from 'Src/config/widgetsDefault';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function ContainerSettings({ settings = {} }) {

  const initialValues = useMemo(() => {
    return {
      ...defaultSettings[WIDGET_IDs.WIDGET_CONTAINER],
      ...settings
    }
  }, [settings]);

  const handleValuesChange = (changedValue, allValues) => {
    console.log('value changed', changedValue, allValues);
  }

  return (
    <Form
      {...layout}
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
