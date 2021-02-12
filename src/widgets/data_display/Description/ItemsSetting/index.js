import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Modal
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import CodeEditor from 'Src/components/CodeEditor';

import styles from './styles.module.scss';

const { TextArea } = Input;

export default function ItemsSetting({ value = [], onChange = () => { } }) {
  const [values, setValues] = useState(value);
  const [expanded, setExpanded] = useState(true);
  const [codeEditorInfo, setCodeEditorInfo] = useState({
    visible: false,
    itemKey: null,
    itemValue: null,
    itemIndex: null,
    itemLabel: null,
  });
  const [codeEditorDraft, setCodeEditorDraft] = useState('');

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

  const showCodeEditor = (key, val, index, label) => {
    setCodeEditorInfo({
      visible: true,
      itemKey: key,
      itemValue: val,
      itemIndex: index,
      itemLabel: label
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
            <div className={styles.item} key={val.id}>
              <div className={styles.itemForm}>
                <div className={styles.formItem}>
                  <label>Label:</label>
                  <Input
                    value={val.label}
                    onChange={(e) => handleValueChange('label', e.target.value, index)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Property:</label>
                  <Input
                    value={val.property}
                    onChange={(e) => handleValueChange('property', e.target.value, index)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Render:</label>
                  <TextArea
                    value={val.renderStr}
                    onClick={(e) => {
                      showCodeEditor('renderStr', val.renderStr, index, 'Render');
                    }}
                  />
                </div>
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
      <Modal
        width={600}
        title={`Editing: ${codeEditorInfo.itemLabel}`}
        visible={codeEditorInfo.visible}
        centered={true}
        onOk={() => {
          setCodeEditorInfo({
            ...codeEditorInfo,
            visible: false
          });
          handleValueChange(codeEditorInfo.itemKey, codeEditorDraft, codeEditorInfo.itemIndex);
        }}
        onCancel={() => {
          setCodeEditorInfo({
            ...codeEditorInfo,
            visible: false
          });
          setCodeEditorDraft('');
        }}
      >
        <CodeEditor
          value={codeEditorInfo.itemValue}
          onChange={setCodeEditorDraft}
        />
      </Modal>
    </div >
  )
}
