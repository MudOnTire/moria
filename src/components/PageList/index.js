import React, { useState, useEffect } from 'react';
import { Tree, Button } from 'antd';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditModal from './EditModal';
import { getStorePages, setStorePages } from 'Src/uitls/fns';

import styles from './styles.module.scss';

export default function PageList() {

  const [pages, setPages] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editPage, setEditPage] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // api start
  const fetchPages = () => {
    let pages = getStorePages();
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
      setStorePages(pages);
    }
    setPages(pages);
  }

  useEffect(fetchPages, [refreshTrigger]);
  // api end

  const onAdd = () => {
    setEditPage(null);
    setEditModalVisible(true);
  }

  const onEdit = () => {
    setEditPage(selectedPage);
    setEditModalVisible(true);
  }

  const onSelect = (selectedKeys) => {
    console.log('selectedKeys', selectedKeys);
    const key = selectedKeys[0];
    const page = pages.find(p => p.key === key);
    setSelectedPage(page);
  }

  const onCheck = (checkedKeys) => {
    console.log('checkedKeys', checkedKeys);
  }

  return (
    <div className={styles.pageList}>
      <div className={styles.actions}>
        {
          selectedPage &&
          <Button
            className={styles.addBtn}
            type="text"
            icon={<EditOutlined />}
            onClick={onEdit}
          />
        }
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
      <EditModal
        page={editPage}
        visible={editModalVisible}
        onClose={() => { setEditModalVisible(false) }}
        onSaved={() => { setRefreshTrigger(new Date().valueOf()) }}
      />
    </div>
  )
}
