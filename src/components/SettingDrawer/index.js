import React from 'react';
import { Drawer } from 'antd';

export default function SettingDrawer({ visible, onClose }) {
  return (
    <Drawer
      title="Settings"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}
