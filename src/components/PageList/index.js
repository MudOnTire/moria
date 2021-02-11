import React, { useState, useEffect } from 'react';
import { Tree, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import EditModal from './EditModal';

import styles from './styles.module.scss';

export default function PageList() {

  const [pages, setPages] = useState([]);
  const [seletedPage, setSeletedPage] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // api start
  const fetchPages = () => {
    let pages = JSON.parse(localStorage.getItem('moria-pages'));
    if (!pages) {
      pages = [{
        title: 'Home',
        key: 'home',
        description: 'The default page'
      }, {
        title: 'Test',
        key: 'test',
        description: 'Test page'
      }];
      localStorage.setItem('moria-pages', JSON.stringify(pages));
    }
    setPages(pages);
  }

  useEffect(fetchPages, []);
  // api end

  const onAdd = () => {
    setEditModalVisible(true);
  }

  const onSelect = (selectedKeys) => {
    console.log('selectedKeys', selectedKeys);
    const key = selectedKeys[0];
    const page = pages.find(p => p.key === key);
    setSeletedPage(page);
  }

  const onCheck = (checkedKeys) => {
    console.log('checkedKeys', checkedKeys);
  }

  return (
    <div className={styles.pageList}>
      <div className={styles.actions}>
        <Button
          className={styles.addBtn}
          type="text"
          icon={<PlusCircleOutlined />}
          onClick={onAdd}
        />
      </div>
      {
        pages ?
          <Tree
            checkable
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={pages}
          />
          :
          <p>No papes found!</p>
      }
      <EditModal visible={editModalVisible} onClose={() => { setEditModalVisible(false) }} />
    </div>
  )
}
