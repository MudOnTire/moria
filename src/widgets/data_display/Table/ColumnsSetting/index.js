import React, { useState } from 'react';
import {
  Input,
  Button
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export default function ColumnsSetting({ value = [], onChange = () => { } }) {
  const [values, setValues] = useState(value);

  const handleValueChange = (key, value, index) => {
    setValues((vals) => {
      vals[index][key] = value;
      onChange(vals);
      return vals;
    });
  }

  const addCol = () => {
    setValues((vals) => {
      return [
        ...vals,
        {
          title: '',
          dataIndex: '',
        }
      ]
    });
  }

  const removeCol = (index) => {

  }

  return (
    <div className={styles.columns}>
      {
        values?.map((val, index) => {
          return (
            <div className={styles.colItem} key={val.title}>
              <div className={styles.colForm}>
                <div className={styles.formItem}>
                  <label>Title:</label>
                  <Input value={val.title} onChange={(e) => handleValueChange('title', e.target.value, index)} />
                </div>
                <div className={styles.formItem}>
                  <label>Data Index:</label>
                  <Input value={val.dataIndex} onChange={(e) => handleValueChange('dataIndex', e.target.value, index)} />
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
