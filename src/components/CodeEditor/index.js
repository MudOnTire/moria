import React from 'react';
import { Controlled } from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import styles from './styles.module.scss';

export default function CodeEditor({ value, onChange, options = {}, ...rest }) {

  return (
    <div>
      <Controlled
        value={value}
        className={styles.editor}
        options={{
          mode: {
            name: "javascript"
          },
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
          lint: true,
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
