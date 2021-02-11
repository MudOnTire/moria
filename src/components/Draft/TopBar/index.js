import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Tooltip } from 'antd';
import { DesktopOutlined, TabletOutlined, MobileOutlined, FundViewOutlined, FilePptOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import { getStorePage } from 'Src/uitls/fns';

import styles from './styles.module.scss';

export default function TopBar() {

  const history = useHistory();

  const store = useContext(context);
  const { dispatch, deviceType, currentPage } = store;

  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(getStorePage(currentPage));
  }, [currentPage]);

  const changeScreenSize = (payload) => {
    dispatch({
      type: actions.SET_DEVICE_TYPE,
      payload
    });
  }

  const goPreview = () => {
    history.push('/preview');
  }

  return (
    <div className={styles.topBar}>
      <div className={styles.pageTitle}><FilePptOutlined />{page?.title}</div>
      <div className={styles.draftActions}>
        <Tooltip title="Desktop">
          <Button
            type="text"
            icon={<DesktopOutlined />}
            className={deviceType === 'desktop' ? styles.activeDevice : ''}
            onClick={() => { changeScreenSize('desktop') }}
          />
        </Tooltip>
        <Tooltip title="Tablet">
          <Button
            type="text"
            icon={<TabletOutlined />}
            className={deviceType === 'tablet' ? styles.activeDevice : ''}
            onClick={() => { changeScreenSize('tablet') }}
          />
        </Tooltip>
        <Tooltip title="Mobile">
          <Button
            type="text"
            icon={<MobileOutlined />}
            className={deviceType === 'mobile' ? styles.activeDevice : ''}
            onClick={() => { changeScreenSize('mobile') }}
          />
        </Tooltip>
        <Tooltip title="Preview">
          <Button
            type="text"
            icon={<FundViewOutlined />}
            onClick={goPreview}
          />
        </Tooltip>
      </div>
    </div>
  )
}
