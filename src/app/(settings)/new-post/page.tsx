'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';

import 'react-quill/dist/quill.snow.css';

import BaseDialog from '@/components/base/BaseDialog';
import NewBaseDialog from '@/components/base/NewBaseDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import UploadImage from '@/components/uploadImage';

import { getCategoriesRequest } from '@/requests/common/categories';
import { uploadImageRequest } from '@/requests/common/uploadImg';
import { createPostRequest } from '@/requests/posts';
import HeaderNewPost from '@/templates/HeaderNewPost';
import { isApiError } from '@/utils/error';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center justify-center p-20">
      <Spinner />
      Loading
    </div>
  ),
});

export default function NewsLetter() {
  const [itemModal, setItemModal] = useState<{
    title: string;
    description: string;
    image: string;
    categoryList: string[];
  }>({
    title: '',
    description: '',
    image: '',
    categoryList: [],
  });
  const [category, setCategory] = useState<string>('');
  const [categoryMenu, setCategorymenu] = useState<string[]>([]);
  const [categoryDisable, setCategoryDisable] = useState(false);
  const [content, setContent] = useState('');
  const [disabledPublish, setDisabledPublish] = useState(false);
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'OK',
    cancelBtn: 'Cancel',
    onSubmit: () => {},
    onCancel: () => {},
  });
  const [modalList, setModalList] = useState({
    visible: false,
    title: '',
    submitBtn: 'Create',
    cancelBtn: 'Cancel',
  });

  const handleContentChange = async (value: string) => {
    if (value === '<p><br></p>' || value === '') {
      setContent('');
    } else {
      setContent(value);
    }
  };

  const getImage = useCallback(() => {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) return;
      const file: File | undefined = input?.files[0];
      if (file) {
        const dataBody = new FormData();
        dataBody.append('file', file);
        dataBody.append('FileName', file.name);
        const response = await uploadImageRequest(dataBody);
        const editor = document.querySelector(
          '#quillId .ql-container .ql-editor',
        );
        const imageElement = document.createElement('img');
        imageElement.src = response?.data?.filePath;
        editor?.appendChild(imageElement);
      }
    };
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          ['link', 'image', 'video', 'formula'],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
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
    }),
    [getImage],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  const submitHandler = async () => {
    setModalList((prev) => ({
      ...prev,
      visible: true,
      title: 'Created New Post Info',
    }));
  };

  const handleCancelModal = () => {
    setModalList((prev) => ({
      ...prev,
      visible: false,
    }));
    clearModalItem();
  };

  const postNewBlog = async () => {
    const cookies = new Cookies();
    const payload = {
      user_id: cookies.get('userId'),
      title: itemModal.title,
      content: content,
      categories: itemModal.categoryList,
      description: itemModal.description,
      image: itemModal.image,
      status: 1,
    };

    try {
      const response = await createPostRequest(payload);
      setModalList((prev) => ({
        ...prev,
        visible: false,
      }));
      clearModalItem();
      setContent('');
      setDialogList((prev) => ({
        ...prev,
        title: 'Confirm',
        visible: true,
        message: response.message,
        cancelBtn: '',
        onSubmit: handleCancelDialog,
      }));
    } catch (error: unknown) {
      let message = '';
      if (isApiError(error)) {
        message = error.message;
      }
      setDialogList((prev) => ({
        ...prev,
        title: 'Error',
        visible: true,
        message,
        cancelBtn: '',
        onSubmit: handleCancelDialog,
      }));
    }
  };

  const handleSubmitDialog = () => {
    if (!validatePayload(itemModal)) {
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }));
      postNewBlog();
    } else {
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }));
    }
  };

  const clearModalItem = () => {
    setItemModal((prev) => ({
      ...prev,
      title: '',
      description: '',
      image: '',
      categoryList: [],
    }));
    setCategory('');
  };

  const handleCancelDialog = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  function validatePayload(payload: object) {
    for (const [key, value] of Object.entries(payload)) {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value.length === 0
      ) {
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
        submitBtn: 'OK',
        onSubmit: handleSubmitDialog,
        onCancel: handleCancelDialog,
      }));
    } else {
      setDialogList((prev) => ({
        ...prev,
        title: 'Confirm',
        visible: true,
        message: `${validatePayload(itemModal)}`,
        cancelBtn: '',
        onSubmit: handleCancelDialog,
      }));
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemModal((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemModal((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleAddItemCategoryMenu = (item: string) => {
    const addCategoryList = [...itemModal.categoryList, item];
    setItemModal((prev) => ({ ...prev, categoryList: addCategoryList }));
    setCategory('');
  };

  const handleCategoryKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && category.trim()) {
      const addCategoryList = [...itemModal.categoryList, category];
      console.log(addCategoryList);

      setItemModal((prev) => ({ ...prev, categoryList: addCategoryList }));
      setCategory('');
    }
  };

  const deleteCategory = (index: number) => {
    const updatedCategoryList = [...itemModal.categoryList];
    updatedCategoryList.splice(index, 1);
    setItemModal((prev) => ({ ...prev, categoryList: updatedCategoryList }));
  };

  const handleUploadImage = async (file: string) => {
    setItemModal((prev) => ({ ...prev, image: file }));
  };

  useEffect(() => {
    inputRef?.current?.focus();
    textAreaRef?.current?.focus();
  }, []);

  useEffect(() => {
    setDisabledPublish(content.length > 0 ? false : true);
  }, [content]);

  useEffect(() => {
    setCategoryDisable(itemModal.categoryList?.length >= 5 ? true : false);
  }, [itemModal.categoryList]);

  useEffect(() => {
    if (!category) {
      setCategorymenu([]);
    } else {
      try {
        getCategoriesRequest(category).then((response) => {
          setCategorymenu(response);
          if (itemModal.categoryList.length > 0) {
            const filterCategory = response?.filter(
              (item: string) => !itemModal.categoryList.includes(item),
            );
            setCategorymenu(filterCategory);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [category, itemModal.categoryList]);

  return (
    <div>
      <style>{`
        .quill-editor .ql-toolbar.ql-snow {
          position: sticky;
          top: 85px;
          background: var(--color-11);
          z-index: 2;
          box-shadow: 1px 1px 10px -5px var(--color-01);
          border: none;
        }
        .quill-editor .ql-toolbar.ql-snow .ql-formats svg {
          filter: var(--filter-01);
        }
        .quill-editor .ql-toolbar.ql-snow .ql-picker .ql-picker-label::before {
          color: var(--color-01);
        }
        .quill-editor .ql-toolbar.ql-snow .ql-picker-options svg {
          filter: unset;
        }
        .quill-editor .ql-container.ql-snow {
          border: none;
          height: auto;
        }
        .quill-editor .ql-container.ql-snow .ql-editor {
          min-height: 50vh;
        }
      `}</style>
      <HeaderNewPost disabledPublish={disabledPublish} onPost={submitHandler} />
      <div className="border border-[var(--color-01)]">
        <div className="flex">
          <div className="quill-editor w-1/2 border-r border-[var(--color-01)]">
            <ReactQuill
              id="quillId"
              value={content}
              onChange={handleContentChange}
              modules={quillModules}
              scrollingContainer="html"
              theme="snow"
            />
          </div>
          <div className="ql-snow w-1/2 [&_pre]:min-h-[28px] [&_pre]:bg-[#23241f] [&_pre]:text-[#f8f8f2] [&_pre]:overflow-visible [&_pre]:whitespace-pre-wrap [&_pre]:mb-[5px] [&_pre]:mt-[5px] [&_pre]:p-[5px_10px]">
            <div
              className="ql-editor w-full"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
      <BaseDialog
        dialogList={modalList}
        onSubmit={handleSubmitModal}
        onCancel={handleCancelModal}
        customClass="w-[80%] h-[80%]"
      >
        <div className="flex flex-col gap-[30px] pb-[30px]">
          <div className="flex flex-col gap-[30px] px-5">
            <div className="title">Blog Name</div>
            <Textarea
              ref={textAreaRef}
              value={itemModal.title}
              placeholder="Title"
              onChange={handleChangeTitle}
              className="w-full text-xl font-medium bg-[var(--color-11)] focus-visible:outline-none"
            />
          </div>
          <div className="flex flex-col gap-[30px] px-5">
            <div className="title">Blog Description</div>
            <Textarea
              value={itemModal.description}
              placeholder="Description"
              onChange={handleDescription}
              className="w-full text-xl font-medium bg-[var(--color-11)] focus-visible:outline-none"
            />
          </div>
          <div className="flex flex-col gap-[30px] px-5">
            <div className="title">Blog Category</div>
            <Input
              ref={categoryRef}
              disabled={categoryDisable}
              value={category}
              placeholder="Category"
              onChange={handleCategory}
              onKeyDown={handleCategoryKeyDown}
              className="w-full text-xl font-medium bg-[var(--color-11)] focus-visible:outline-none"
            />
            {categoryMenu.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {categoryMenu?.map((item, index) => (
                  <div className="cursor-pointer" key={index}>
                    <Button
                      variant="outline"
                      onClick={() => handleAddItemCategoryMenu(item)}
                    >
                      {item}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {itemModal.categoryList.length > 0 && (
              <div className="flex items-center gap-2">
                {itemModal.categoryList?.map((item, index) => (
                  <div
                    className="py-1 px-2 flex items-center gap-2 bg-[var(--color-12)] text-[var(--color-11)] rounded-lg"
                    key={index}
                  >
                    <span>{item}</span>
                    <X
                      className="h-4 w-4 rounded-full bg-[var(--color-13)] text-[var(--color-04)]"
                      onClick={() => deleteCategory(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[30px] px-5">
            <div className="title">Blog Image</div>
            <UploadImage
              classCustom="w-[400px] h-[250px]"
              onChange={handleUploadImage}
            />
          </div>
        </div>
      </BaseDialog>
      <NewBaseDialog dialogList={dialogList} />
    </div>
  );
}
