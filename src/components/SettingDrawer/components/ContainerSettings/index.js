import React from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';

const { Option } = Select;

export default function ContainerSettings({ }) {
  return (
    <div>
      <Form.Item
        name="select"
        label="Flex direction"
        hasFeedback
      >
        <Select placeholder="Select a direction">
          <Option value="row">Row</Option>
          <Option value="column">Column</Option>
        </Select>
      </Form.Item>
    </div>
  )
}
