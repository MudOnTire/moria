import React, { useState } from 'react';
import { Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import styles from './styles.module.scss';

export default function WidgetsContainer({ id, className = '', children, ...rest }) {

  const [showSettingBtn, setShowSettingBtn] = useState(false);

  const handleMouseEnter = (e) => {
    setShowSettingBtn(true);
  }

  const handleMouseLeave = (e) => {
    setShowSettingBtn(false);
  }

  return (
    <div
      className={`${styles.widgetsContainer} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {
        showSettingBtn &&
        <Button
          type="primary"
          className={styles.settingBtn}
          icon={<SettingFilled />}
        />
      }
      {children}
    </div>
  )
}
