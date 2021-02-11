import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { getStorePages, setStorePages } from 'Src/uitls/fns';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function EditModal({
  page = {
    title: '',
    key: '',
    description: ''
  },
  visible = false,
  onClose = () => { },
  onSaved = () => { }
}) {
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  const isEdit = !!(page?.key);

  const handleValuesChange = (changedValue, allValues) => {
    console.log('page changed', changedValue, allValues);
    setValues(allValues);
  }

  const handleSave = () => {
    form.validateFields()
      .then(() => {
        const pages = getStorePages();
        if (isEdit) {
          let index = pages.findIndex(p => p.key == page.key);
          if (index < 0) return;
          pages[index] = {
            ...pages[index],
            ...values
          }
        } else {
          pages.push({ ...values });
        }
        setStorePages(pages);
        onSaved();
        onClose();
      })
      .catch(err => {
        console.log('validate err', err);
      });
  }

  const handleClose = () => {
    onClose();
    form.resetFields();
  }

  return (
    <div>
      <Modal
        width={600}
        title={isEdit ? `Edit page: ${page.title}` : 'Create Page'}
        visible={visible}
        centered={true}
        onOk={handleSave}
        onCancel={handleClose}
      >
        <Form
          {...layout}
          form={form}
          initialValues={page}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please input a page title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Key'
            name='key'
            rules={[{ required: true, message: 'Please input an unique page key!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
