import React, { useEffect, useState } from 'react';
import {
  Input,
  Button
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export default function ColumnsSetting({ value = [], onChange = () => { } }) {
  const [values, setValues] = useState(value);
  const [expanded, setExpanded] = useState(true);

  const handleValueChange = (key, val, index) => {
    setValues((vals) => {
      if (key === 'dataIndex') {
        if (val?.indexOf('.') > 0) {
          val = val.split('.');
        }
      }
      vals[index][key] = val;
      onChange(vals);
      return vals;
    });
  }

  const addCol = () => {
    setValues((vals) => {
      vals.push({
        id: new Date().valueOf(),
        title: '',
        dataIndex: '',
      });
      onChange(vals);
      return vals;
    });
  }

  const removeCol = (index) => {
    setValues((vals) => {
      vals.splice(index, 1);
      onChange(vals);
      return vals;
    });
  }

  const toggle = () => {
    setExpanded(!expanded);
  }

  return (
    <div className={`${styles.columns} ${expanded ? styles.expanded : styles.folded}`}>
      <Button
        type="text"
        icon={expanded ? <UpCircleOutlined /> : <DownCircleOutlined />}
        onClick={toggle}
      />
      {
        values?.map((val, index) => {
          return (
            <div className={styles.colItem} key={val.id}>
              <div className={styles.colForm}>
                <div className={styles.formItem}>
                  <label>Title:</label>
                  <Input
                    value={val.title}
                    onChange={(e) => handleValueChange('title', e.target.value, index)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Data Index:</label>
                  <Input
                    value={val.dataIndex}
                    onChange={(e) => handleValueChange('dataIndex', e.target.value, index)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Width:</label>
                  <Input
                    value={val.width}
                    onChange={(e) => handleValueChange('width', e.target.value, index)}
                  />
                </div>
              </div>
              <Button
                className={styles.removeBtn}
                type="text"
                icon={<MinusCircleOutlined />}
                onClick={() => { removeCol(index) }}
              />
            </div>
          )
        })
      }
      <Button
        className={styles.addBtn}
        type="text"
        icon={<PlusCircleOutlined />}
        onClick={addCol}
      />
    </div>
  )
}
