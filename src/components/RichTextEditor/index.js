import React, { useState } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default function RichTextEditor({ value = '', onChange = () => { } }) {

  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(value));

  const handleSave = (...params) => {
    console.log('save rich text editor', ...params);
  }

  const handleChange = (state) => {
    setEditorState(state);
    onChange(state.toHTML());
  }

  return (
    <BraftEditor
      value={editorState}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}