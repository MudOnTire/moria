import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import styles from './styles.module.scss';

export default function CodeEditor({ value, onChange, options = {}, ...rest }) {

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
          lineNumbers: true,
          ...options
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
        {...rest}
      />
    </div>
  )
}
