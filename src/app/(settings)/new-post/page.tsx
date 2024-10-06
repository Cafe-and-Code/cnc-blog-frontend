'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/constant/api-config';
import 'react-quill/dist/quill.snow.css';
import '@/styles/new-post.scss'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function QuillEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');



  const handleContentChange = (value: any) => {
    console.log(value);
    setContent(value);
  };

  const module = {
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
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      // Đặt focus cho input khi component được render
      if (inputRef.current) {
          inputRef.current.focus();
      }
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault()
    const payload = {
      id: '42683370-f8dd-4edb-eb1f-08dce2285b54',
      title: title,
      content: content
    }
    try {
      axios.post(API_URL.POSTS, payload)
    } catch(error) {

    }
    console.log(payload);
  }

  return (
    <div className='new-post'>
      <div className='editor-newsletter'>
        <div className='title-input'>
          <input ref={inputRef} value={title} type="text" placeholder='Title' onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className='edit-post'>
          <h1></h1>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={module}
          />
          <div className='ql-editor editor-content' dangerouslySetInnerHTML={{ __html: content }}>
          </div>
        </div>
      </div>
        <button onClick={submitHandler}>Save</button>
    </div>
  );
}

export default QuillEditor;