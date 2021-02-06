import React, { useMemo, useState } from 'react';
import {
  Input
} from 'antd';

export default function Slides({ count = 0, value = [], onChange = () => { } }) {

  const [values, setValues] = useState(value);

  const arr = useMemo(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }
    return result;
  }, [count]);

  const handleChange = (n, newVal) => {
    setValues((vals) => {
      vals[n] = newVal;
      onChange(vals);
      console.log('vals', vals);
      return vals;
    });
  }

  return (
    <div>
      {
        arr.map(n => (
          <Input
            value={values[n]}
            style={{ marginBottom: 10 }}
            key={n}
            onChange={(e) => { handleChange(n, e.target.value) }}
          />
        ))
      }
    </div>
  )
}
