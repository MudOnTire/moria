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

export default function ColumnsSetting({ value = [], onChange = () => { } }) {
  const [values, setValues] = useState(value);
  const [expanded, setExpanded] = useState(true);
  const [codeEditorInfo, setCodeEditorInfo] = useState({
    visible: false,
    colKey: null,
    colValue: null,
    colIndex: null
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

  const showCodeEditor = (key, val, index) => {
    setCodeEditorInfo({
      visible: true,
      colKey: key,
      colValue: val,
      colIndex: index
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
                  <label>Render:</label>
                  <TextArea
                    value={val.renderStr}
                    onClick={(e) => {
                      showCodeEditor('renderStr', val.renderStr, index);
                    }}
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
      <Modal
        width={600}
        title="Code Editor"
        visible={codeEditorInfo.visible}
        onOk={() => {
          setCodeEditorInfo({
            ...codeEditorInfo,
            visible: false
          });
          handleValueChange(codeEditorInfo.colKey, codeEditorDraft || codeEditorInfo.colValue, codeEditorInfo.colIndex);
        }}
        onCancel={() => {
          setCodeEditorInfo({
            ...codeEditorInfo,
            visible: false
          });
        }}
      >
        <CodeEditor
          value={codeEditorInfo.colValue}
          onChange={setCodeEditorDraft}
        />
      </Modal>
    </div >
  )
}
