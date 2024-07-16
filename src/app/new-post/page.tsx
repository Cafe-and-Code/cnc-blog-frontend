'use client'

import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import '@/styles/new-post.scss'

function QuillEditor() {
  const [content, setContent] = useState('');

  const handleContentChange = (value: any) => {
    console.log(value)
    setContent(value);
  };

  return (
    <div className='new-post'>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
          ],
        }}
      />
      <div className='ql-editor editor-content' dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  );
}

export default QuillEditor;