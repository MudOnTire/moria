import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import styles from './styles.module.scss';

export default function CodeEditor({ value, onChange }) {

  return (
    <div>
      <CodeMirror
        value={value}
        className={styles.editor}
        options={{
          mode: {
            name: "javascript"
          },
          theme: 'material',
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {
          onChange(value);
        }}
      />
    </div>
  )
}
