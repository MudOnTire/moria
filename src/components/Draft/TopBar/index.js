import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Tooltip, message } from 'antd';
import { DownloadOutlined, DesktopOutlined, TabletOutlined, MobileOutlined, FundViewOutlined, FilePptOutlined, SaveOutlined } from '@ant-design/icons';
import { context, actions } from 'Src/store';
import { getStorePage, getStorePages, setStorePages } from 'Src/uitls/fns';

import styles from './styles.module.scss';

export default function TopBar() {

  const history = useHistory();

  const store = useContext(context);
  const { dispatch, deviceType, currentPage, pageConfig, saveTrigger } = store;

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

  const save = () => {
    const pages = getStorePages();
    const index = pages.findIndex(p => p.key === currentPage);
    if (index < 0) return;
    pages[index].config = pageConfig;
    setStorePages(pages);
    message.success('Page config saved.');
  }

  const download = () => {
    const pages = getStorePages();
    const encoded =
      `data:application/json;charset=utf-8,` + encodeURIComponent(JSON.stringify(pages));
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", `moria pages.json`);
    document.body.appendChild(link);
    link.click();
  }

  // 触发页面保存
  useEffect(save, [saveTrigger])

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
      <div className={styles.rightActions}>
        <Tooltip title="Save current page config">
          <Button
            type="text"
            icon={<SaveOutlined />}
            onClick={save}
          />
        </Tooltip>
        <Tooltip title="Download pages' config">
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={download}
          />
        </Tooltip>
      </div>
    </div>
  )
}
