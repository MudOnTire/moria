import React, { useState, useMemo, useContext, useEffect } from 'react';
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
import { getTreeItem } from 'Src/uitls/fns';

const { Option } = Select;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

export default function SettingBuilder({ id }) {
  const store = useContext(context);
  const { dispatch, pageConfig } = store;

  const [form] = Form.useForm();
  const [widget, setWidget] = useState(null);
  const [renderTrigger, setRenderTrigger] = useState(null);

  const getWidget = () => {
    const treeItem = getTreeItem(pageConfig.children, id);
    if (!treeItem?.item) return;
    const widget = treeItem.item;
    setWidget(widget);
  }

  useEffect(getWidget, [id, renderTrigger]);

  useEffect(form.resetFields, [id]);

  const handleValuesChange = (changedValue, allValues) => {
    console.log('value changed', changedValue, allValues);
    if (widget.widgetId === WIDGET_IDs.DATA_DISPLAY_CAROUSEL) {
      if (typeof changedValue.count !== 'undefined') {
        setRenderTrigger(new Date().valueOf());
      }
    }
    dispatch({
      type: actions.UPDATE_WIDGET_SETTINGS,
      payload: {
        id,
        settings: allValues
      }
    });
  }

  if (!widget) return null;

  const initialValues = {
    ...defaultSettings[widget.widgetId],
    ...widget.settings
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
        settingSchemas[widget.widgetId]?.map(schema => {
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
            if (widget.widgetId === WIDGET_IDs.DATA_DISPLAY_CAROUSEL && schema.id === 'slides') {
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
