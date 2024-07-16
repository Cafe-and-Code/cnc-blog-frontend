"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillEditor() {
  const [content, setContent] = useState('');

  const handleContentChange = (value: any) => {
    console.log(value);
    setContent(value);
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
      />
      <div className="html-content">
        <h2>HTML Content:</h2>
        {document.getElementsByClassName('ql-editor')[0]?.innerHTML }
      </div>
    </div>
  );
}

export default QuillEditor;