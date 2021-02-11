import React from 'react';
import { Modal, Form, Input } from 'antd';

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
  onClose = () => { }
}) {

  const handleValuesChange = (changedValue, allValues) => {
    console.log('page changed', changedValue, allValues);
  }

  return (
    <div>
      <Modal
        width={600}
        title={page.key ? `Edit page: ${page.title}` : 'Create Page'}
        visible={visible}
        centered={true}
        onOk={() => {

        }}
        onCancel={onClose}
      >
        <Form
          {...layout}
          initialValues={page}
          onValuesChange={handleValuesChange}
        >
          <Form.Item label='Title' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='Key' name='key'>
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
