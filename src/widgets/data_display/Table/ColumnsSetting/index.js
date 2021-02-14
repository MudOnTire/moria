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
  const [codeEditorVisible, setCodeEditorVisible] = useState(false);
  const [codeEditorInfo, setCodeEditorInfo] = useState({
    colKey: null,
    colIndex: null,
    colLabel: null,
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
    setCodeEditorVisible(true);
    setCodeEditorDraft(val);
    setCodeEditorInfo({
      colKey: key,
      colIndex: index,
      colLabel: label
    });
  }

  const addCol = () => {
    setValues((vals) => {
      vals.push({
        id: new Date().valueOf(),
        title: '',
        dataIndex: '',
        link: ''
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
                <h3 className={styles.colIndex}>{index + 1}</h3>
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
                      showCodeEditor('renderStr', val.renderStr, index, 'Render');
                    }}
                  />
                </div>
                <div className={styles.formItem}>
                  <label>Link:</label>
                  <Input
                    value={val.link}
                    onChange={(e) => handleValueChange('link', e.target.value, index)}
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
        width={1000}
        title={`Editing: columns[${codeEditorInfo.colIndex}].${codeEditorInfo.colLabel}`}
        visible={codeEditorVisible}
        centered={true}
        destroyOnClose={true}
        onOk={() => {
          handleValueChange(codeEditorInfo.colKey, codeEditorDraft, codeEditorInfo.colIndex);
          setCodeEditorVisible(false);
        }}
        onCancel={() => {
          setCodeEditorVisible(false);
          setCodeEditorDraft('');
        }}
      >
        <CodeEditor
          value={codeEditorDraft}
          onChange={setCodeEditorDraft}
        />
      </Modal>
    </div >
  )
}
