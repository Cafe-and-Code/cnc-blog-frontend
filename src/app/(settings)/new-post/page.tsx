'use client'

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';

import 'react-quill/dist/quill.snow.css';
import '@/styles/new-post.scss'

import axios from '@/lib/axios';

import BaseDialog from '@/components/base/BaseDialog';

import { API_URL } from '@/app/constant/api-config';
import HeaderNewPost from '@/app/templates/HeaderNewPost';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});


export default function NewsLetter() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [titleDialog, setTilteDialog] = useState('')

  const handleContentChange = async (value: any) => {
    setContent(value)
  };

  const getImage = () => {
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input?.files[0];
      if (file) {
        const dataBody = new FormData()
        dataBody.append('file', file)
        dataBody.append('FileName', file.name)
        const response = await axios.post(API_URL.UPLOAD_IMAGE, dataBody, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        const editor = document.querySelector('#quillId .ql-container .ql-editor');
        const imageElement = document.createElement('img')
        imageElement.src = response?.data?.filePath
        editor?.appendChild(imageElement)
      }
    };
  }

  const quillModules: any = useMemo(() => ({
    toolbar: {
      container: [
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
      handlers: {
        image: getImage,
      },
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }), [])

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Đặt focus cho input khi component được render
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitHandler = () => {
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
      // const data = error?.response?.data
      // const messages = data?.errors.join('\n')
      // setIsOpen(true)
      // setTilte('Error')
      // setMessage(messages)
    }
  }

  const handleSubmit = () => {
    setIsOpen(false)
  }

  return (
    <div className='new-post'>
      <HeaderNewPost onPost={submitHandler} />
      <div className='editor-newsletter'>
        <div className='title-input'>
          <input ref={inputRef} value={title} type="text" placeholder='Title' onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='edit-post'>
          <h1></h1>
          <ReactQuill
            id='quillId'
            value={content}
            onChange={handleContentChange}
            modules={quillModules}
          />
          <div className='ql-editor editor-content' dangerouslySetInnerHTML={{ __html: content }}>
          </div>
        </div>
      </div>
      <BaseDialog
        title={titleDialog}
        visible={isOpen}
        message={message}
        submitBtn='Submit'
        onSubmit={handleSubmit}
      />
    </div>
  );
}
