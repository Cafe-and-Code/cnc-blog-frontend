'use client'

import { X } from "lucide-react"
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';

import 'react-quill/dist/quill.snow.css';
import '@/styles/new-post.scss'

import axios from '@/lib/axios';

import BaseDialog from '@/components/base/BaseDialog';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import UploadImage from '@/components/uploadImage';

import { API_URL } from '@/app/constant/api-config';
import HeaderNewPost from '@/app/templates/HeaderNewPost';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});


export default function NewsLetter() {
  const [itemModal, setItemModal] = useState<{ title: string, description: string, titleImageUrl: string, categoryList: string[] }>({
    title: '',
    description: '',
    titleImageUrl: '',
    categoryList: []
  })
  const [category, setCategory] = useState<string>('')
  const [categoryMenu, setCategorymenu] = useState<string[]>([])
  const [categoryDisable, setCategoryDisable] = useState(false)
  const [content, setContent] = useState('');
  const [disabledPublish, setDisabledPublish] = useState(false);
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'OK',
    cancelBtn: 'Cancel'
  });
  const [modalList, setModalList] = useState({
    visible: false,
    title: '',
    submitBtn: 'Create',
    cancelBtn: 'Cancel'
  })

  const handleContentChange = async (value: any) => {
    if (value === '<p><br></p>' || value === '') {
      setContent('');
    } else {
      setContent(value)
    }
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
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        ['link', 'image', 'video', 'formula'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  const submitHandler = async () => {
    setModalList((prev) => ({
      ...prev,
      visible: true,
      title: 'Created New Post Info',
    }))
  }

  const handleCancelModal = () => {
    setModalList((prev) => ({
      ...prev,
      visible: false,
    }))
    clearModalItem()
  }

  const postCategory = async () => {
    try {
      await axios.post(API_URL.CATEGORIES, { name: itemModal.categoryList })
    } catch (error: any) {
      const data = error?.response?.data
      const messages = data?.errors.join('\n')
      setDialogList((prev) => ({
        ...prev,
        title: 'Error',
        visible: true,
        message: messages
      }))
    }
  }

  const postNewBlog = () => {
    const cookies = new Cookies();
    const payload = {
      authorId: cookies.get('userId'),
      title: itemModal.title,
      content: content,
      categories: itemModal.categoryList,
      description: itemModal.description,
      titleImageUrl: itemModal.titleImageUrl,
      status: 1
    }
    console.log(payload);

    try {
      axios.post(API_URL.POSTS, payload)
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }))
      setModalList((prev) => ({
        ...prev,
        visible: false,
      }))
      clearModalItem()
      setContent('')
    } catch (error: any) {
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }))
      const data = error?.response?.data
      const messages = data?.errors.join('\n')
      setDialogList((prev) => ({
        ...prev,
        title: 'Error',
        visible: true,
        message: messages
      }))
    }
  }

  const handleSubmitDialog = () => {
    if (!validatePayload(itemModal)) {
      postNewBlog()
    } else {
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }))
    }
  }

  const clearModalItem = () => {
    setItemModal((prev) => ({
      ...prev,
      title: '',
      description: '',
      titleImageUrl: '',
      categoryList: []
    }))
    setCategory('')
  }

  const handleCancelDialog = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }))
  }

  function validatePayload(payload: object) {
    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined || value === null || value === '' || value.length === 0) {
        return `The value of [${key}] cannot be empty.`;
      }
    }
    return;
  }

  const handleSubmitModal = () => {
    if (!validatePayload(itemModal)) {
      setDialogList((prev) => ({
        ...prev,
        title: 'Confirm',
        visible: true,
        message: 'Are you sure, create new blog.',
        cancelBtn: 'Cancel',
        submitBtn: 'OK'
      }))
    } else {
      setDialogList((prev) => ({
        ...prev,
        title: 'Confirm',
        visible: true,
        message: `${validatePayload(itemModal)}`,
        cancelBtn: ''
      }))
    }
  }

  const handleChangeTitle = (e: any) => {
    setItemModal((prev) => ({ ...prev, title: e.target.value }))
  }

  const handleDescription = (e: any) => {
    setItemModal((prev) => ({ ...prev, description: e.target.value }))
  }

  const handleCategory = (e: any) => {
    setCategory(e.target.value)
  }

  const handleAddItemCategoryMenu = (item: string) => {
    const addCategoryList = [...itemModal.categoryList, item];
    setItemModal((prev) => ({ ...prev, categoryList: addCategoryList }));
    setCategory('');
  }

  const handleCategoryKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && category.trim()) {
      const addCategoryList = [...itemModal.categoryList, category];
      console.log(addCategoryList);

      setItemModal((prev) => ({ ...prev, categoryList: addCategoryList }));
      setCategory('');
    }
  }

  const deleteCategory = (index: number) => {
    const updatedCategoryList = [...itemModal.categoryList];
    updatedCategoryList.splice(index, 1);
    setItemModal((prev) => ({ ...prev, categoryList: updatedCategoryList }));
  }

  const handleUploadImage = async (file: any) => {
    setItemModal((prev) => ({ ...prev, titleImageUrl: file }))
  }

  useEffect(() => {
    // Đặt focus cho input khi component được render
    inputRef?.current?.focus();
    textAreaRef?.current?.focus();
  }, []);

  useEffect(() => {
    // Đặt focus cho input khi component được render
    setDisabledPublish(content.length > 0 ? false : true)
  }, [content]);

  useEffect(() => {
    // Đặt focus cho input khi component được render
    setCategoryDisable(itemModal.categoryList?.length >= 3 ? true : false)
  }, [itemModal.categoryList]);

  useEffect(() => {
    if (!category) {
      setCategorymenu([])
    } else {
      try {
        axios.get(`${API_URL.CATEGORIES}/${category}`).then(response => {
          setCategorymenu(response?.data)
          if (itemModal.categoryList.length > 0) {
            const filterCategory = response?.data?.filter((item: string) => !itemModal.categoryList.includes(item))
            setCategorymenu(filterCategory)
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }, [category, itemModal.categoryList])

  return (
    <div className='new-post'>
      <HeaderNewPost disabledPublish={disabledPublish} onPost={submitHandler} />
      <div className='editor-newsletter'>
        <div className='edit-post'>
          <ReactQuill
            id='quillId'
            value={content}
            onChange={handleContentChange}
            modules={quillModules}
            scrollingContainer='html'
            theme="snow"
          />
          <div className='ql-snow editor-content'>
            <div className="ql-editor w-full" dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </div>
      <BaseDialog
        dialogList={modalList}
        onSubmit={handleSubmitModal}
        onCancel={handleCancelModal}
        customClass='w-[80%] h-[80%]'
      >
        <div className='new-post-modal'>
          <div className='content'>
            <div className='title'>Blog Name</div>
            <Textarea ref={textAreaRef} value={itemModal.title} placeholder='Title' onChange={handleChangeTitle} className='title-input' />
          </div>
          <div className='content'>
            <div className='title'>Blog Description</div>
            <Textarea value={itemModal.description} placeholder='Description' onChange={handleDescription} className='title-input text-area' />
          </div>
          <div className='content'>
            <div className='title'>Blog Category</div>
            <Input ref={categoryRef} disabled={categoryDisable} value={category} placeholder='Category' onChange={handleCategory} onKeyDown={handleCategoryKeyDown} className='title-input text-area' />
            {categoryMenu.length > 0 && <div className='category-menu'>
              {categoryMenu?.map((item, index) => (
                <div className='category-menu-item' key={index}>
                  <Button variant='outline'
                    onClick={() => handleAddItemCategoryMenu(item)}>{item}</Button>
                </div>
              ))}
            </div>}
            {itemModal.categoryList.length > 0 && <div className='category-list'>
              {itemModal.categoryList?.map((item, index) => (
                <div className='category-item' key={index}>
                  <span>{item}</span>
                  <X className="h-4 w-4 bg-[var(--color-13)] text-[var(--color-04)] rounded-full" onClick={() => deleteCategory(index)} />
                </div>
              ))}
            </div>}
          </div>
          <div className='content'>
            <div className='title'>Blog Image</div>
            <UploadImage classCustom='w-[400px] h-[250px]' onChange={handleUploadImage} />
          </div>
        </div>
      </BaseDialog>
      <BaseDialog
        dialogList={dialogList}
        onSubmit={handleSubmitDialog}
        onCancel={handleCancelDialog}
      />
    </div>
  );
}
