import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Select
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import OptionsInput from 'Src/components/OptionsInput';

import styles from './styles.module.scss';

const { Option } = Select;

export default function ItemsSetting({ value = [], onChange = () => { } }) {
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

  const removeItem = (index) => {
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
    <div className={`${styles.items} ${expanded ? styles.expanded : styles.folded}`}>
      <Button
        type="text"
        icon={expanded ? <UpCircleOutlined /> : <DownCircleOutlined />}
        onClick={toggle}
      />
      {
        values?.map((val, index) => {
          return (
            <div className={styles.item} key={val.name}>
              <div className={styles.itemForm}>
                <div className={styles.formItem}>
                  <label>Label:</label>
                  <Input
                    value={val.label}
                    onChange={(e) => handleValueChange('label', e.target.value, index)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Property Name:</label>
                  <Input
                    value={val.name}
                    onChange={(e) => handleValueChange('name', e.target.value, index)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Type:</label>
                  <Select
                    value={val.type}
                    onChange={(value) => handleValueChange('type', value, index)}
                  >
                    <Option value='input'>Input</Option>
                    <Option value='number'>Number</Option>
                    <Option value='textarea'>Textarea</Option>
                    <Option value='select'>Select</Option>
                    <Option value='switch'>Switch</Option>
                    <Option value='radio'>Radio</Option>
                    <Option value='datepicker'>Datepicker</Option>
                  </Select>
                </div>
                {
                  val.type === 'select' &&
                  <div className={styles.formItem}>
                    <label>Options:</label>
                    <OptionsInput
                      value={val.options}
                      onChange={(value) => handleValueChange('options', value, index)}
                    />
                  </div>
                }
              </div>
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
        onClick={addCol}
      />
    </div >
  )
}
