'use client'

import dynamic from 'next/dynamic';
import { useEffect, useRef,useState  } from 'react';
import { Cookies } from 'react-cookie';

import 'react-quill/dist/quill.snow.css';
import '@/styles/new-post.scss'

import axios from '@/lib/axios';

import { Button } from '@/components/ui/button';

import { API_URL } from '@/app/constant/api-config';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function QuillEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');



  const handleContentChange = (value: any) => {
    setContent(value);
  };

  const quillModules = {
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
    const cookies = new Cookies();
    const payload = {
      authorId: cookies.get('userId'),
      title: title,
      content: content,
      status: 1
    }
    try {
      axios.post(API_URL.POSTS, payload)
    } catch (error) {
      console.error('Error posting data:', error);
    }
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
            modules={quillModules}
          />
          <div className='ql-editor editor-content' dangerouslySetInnerHTML={{ __html: content }}>
          </div>
        </div>
      </div>
        <Button onClick={submitHandler}>Save</Button>
    </div>
  );
}

export default QuillEditor;