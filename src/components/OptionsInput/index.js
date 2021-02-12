import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export default function OptionsInput({ value = [], onChange = () => { } }) {

  const [options, setOptions] = useState(value || []);

  const removeItem = (index) => {
    setOptions((vals) => {
      vals.splice(index, 1);
      onChange(vals);
      return vals;
    });
  }

  const addItem = () => {
    setOptions((vals) => {
      vals.push({
        id: new Date().valueOf(),
        label: '',
        value: ''
      });
      onChange(vals);
      return vals;
    })
  }

  const handleLabelChange = (label, index) => {
    setOptions((vals) => {
      vals[index].label = label;
      onChange(vals);
      return vals;
    });
  }

  const handleValueChange = (value, index) => {
    setOptions((vals) => {
      vals[index].value = value;
      onChange(vals);
      return vals;
    });
  }

  return (
    <div className={styles.options}>
      {
        options?.map((option, index) => {
          return (
            <div className={styles.option} key={option.id}>
              <Input
                value={option.label}
                placeholder='Input label'
                onChange={(e) => { handleLabelChange(e.target.value, index) }}
              />
              <span className={styles.colon}>:</span>
              <Input
                value={option.value}
                placeholder='Input value'
                onChange={(e) => { handleValueChange(e.target.value, index) }}
              />
              <Button
                className={styles.removeBtn}
                type="text"
                icon={<MinusCircleOutlined />}
                onClick={() => { removeItem(index) }}
              />
            </div>
          )
        })
      }
      <Button
        className={styles.addBtn}
        type="text"
        icon={<PlusCircleOutlined />}
        onClick={addItem}
      />
    </div>
  )
}
