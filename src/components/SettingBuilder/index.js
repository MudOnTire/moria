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
import CodeEditor from 'Src/components/CodeEditor';
import RichTextEditor from 'Src/components/RichTextEditor';

import styles from './styles.module.scss';

const { Option } = Select;

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 },
// };

export default function SettingBuilder({ id }) {
  const store = useContext(context);
  const { dispatch, pageConfig } = store;

  const [form] = Form.useForm();
  const [widget, setWidget] = useState(null);
  const [renderTrigger, setRenderTrigger] = useState(null);

  const getWidget = () => {
    if (id === 'root') {
      setWidget(pageConfig);
    } else {
      const treeItem = getTreeItem(pageConfig.children, id);
      if (!treeItem?.item) return;
      setWidget(treeItem.item);
    }
  }

  useEffect(getWidget, [id, renderTrigger]);

  useEffect(form.resetFields, [widget]);

  const handleValuesChange = (changedValue, allValues) => {
    console.log('value changed', id, changedValue, allValues);
    if (widget.widgetId === WIDGET_IDs.DATA_DISPLAY_CAROUSEL) {
      if (typeof changedValue.count !== 'undefined') {
        setRenderTrigger(new Date().valueOf());
      }
    }
    if (widget.widgetId === WIDGET_IDs.DATA_DISPLAY_TABLE) {
      if (typeof changedValue.api !== 'undefined') {
        allValues.columns?.forEach(column => {
          column.render = null;
          column.renderStr = null;
        });
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
    ...JSON.parse(JSON.stringify(defaultSettings[widget.widgetId])),
    ...widget.settings
  }

  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
    >
      {
        settingSchemas[widget.widgetId]?.map(schema => {
          const formItemProps = {
            label: (schema.label || schema.id) + ':',
            name: schema.id,
            key: schema.id
          }

          if (schema.type === 'string' || (Array.isArray(schema.type) && schema.type.includes('string'))) {
            return (
              <Form.Item {...formItemProps}>
                <Input />
              </Form.Item>
            )
          }
          if (schema.type === 'number') {
            return (
              <Form.Item {...formItemProps}>
                <InputNumber />
              </Form.Item>
            )
          }
          if (schema.type === 'boolean') {
            return (
              <Form.Item
                {...formItemProps}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            )
          }
          if (schema.type === 'enum') {
            return (
              <Form.Item {...formItemProps}>
                <Select>
                  {
                    schema.options?.map(option => <Option value={option} key={option}>{option}</Option>)
                  }
                </Select>
              </Form.Item>
            )
          }
          if (schema.type === 'code') {
            return (
              <Form.Item {...formItemProps}>
                <CodeEditor className={styles.codeEditor} />
              </Form.Item>
            )
          }
          if (schema.type === 'richText') {
            return (
              <Form.Item {...formItemProps}>
                <RichTextEditor />
              </Form.Item>
            )
          }
          if (schema.component) {
            if (widget.widgetId === WIDGET_IDs.DATA_DISPLAY_CAROUSEL && schema.id === 'slides') {
              return (
                <Form.Item {...formItemProps}>
                  <schema.component count={initialValues.count} />
                </Form.Item>
              )
            } else {
              return (
                <Form.Item {...formItemProps}>
                  <schema.component />
                </Form.Item>
              )
            }
          }
        })
      }
    </Form>
  )
}
