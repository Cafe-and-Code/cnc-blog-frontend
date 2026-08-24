import { useRef, useState } from 'react';

import axios from '@/lib/axios';

import BaseDialog from '@/components/base/BaseDialog';
import { Input } from '@/components/ui/input';

import { API_URL } from '@/constants/api-config';
import { isApiError } from '@/utils/error';

import { IUploadImageType } from '@/types/common/components';
export default function uploadImage({
  isAvatar,
  classCustom,
  onChange,
}: IUploadImageType) {
  const [avatar, setAvatar] = useState('');
  const [image, setImage] = useState('');
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'Submit',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const files = input.files;

    if (!files || files.length === 0) return;
    const reader = new FileReader();
    reader.onload = () => {
      getUploadImage(files);
    };
    reader.readAsDataURL(files[0]);
  };

  const getUploadImage = async (files: FileList) => {
    if (files.length === 0) return;
    const file: File = files[0];
    if (file) {
      try {
        const dataBody = new FormData();
        dataBody.append('file', file);
        dataBody.append('FileName', file.name);
        const response = await axios.post(API_URL.UPLOAD_IMAGE, dataBody, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setAvatar(response?.data?.filePath);
        setImage(response?.data?.filePath);
        if (onChange) {
          onChange(response?.data?.filePath);
        }
      } catch (error: unknown) {
        let message = '';
        if (isApiError(error)) {
          message = error.message;
        }
        setDialogList((prev) => ({
          ...prev,
          visible: true,
          message,
          title: 'Error',
          submitBtn: 'Submit',
        }));
      }
    }
  };

  const handleSubmit = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <div
      className={`relative overflow-hidden shadow-[1px_1px_15px_-5px_black] transition-all duration-300 hover:scale-105 hover:cursor-pointer ${classCustom}`}
    >
      {isAvatar && avatar && (
        <img
          onClick={handleClick}
          className="h-full w-full transition-all duration-300 object-cover"
          alt=""
          src={avatar}
          rel="preload"
        />
      )}
      {isAvatar && !avatar && (
        <div
          onClick={handleClick}
          className="h-full w-full flex items-center justify-center bg-[var(--color-13)] cursor-pointer"
        >
          <img src="/images/icon/user.svg" alt="upload avatar" />
        </div>
      )}
      {!isAvatar && image && (
        <img
          onClick={handleClick}
          className="relative rounded w-full h-full transition-all duration-300 object-cover"
          alt=""
          src={image}
          rel="preload"
        />
      )}
      {!isAvatar && !image && (
        <div
          onClick={handleClick}
          className="relative rounded w-full h-full flex items-center justify-center bg-[#ecf0f1] cursor-pointer"
        >
          <img src="/images/icon/add-pic.svg" alt="upload image" />
        </div>
      )}
      <Input
        ref={inputRef}
        className="file-upload"
        id="picture"
        type="file"
        onChange={handleUploadImage}
        accept="image/*"
      />
      <BaseDialog dialogList={dialogList} onSubmit={handleSubmit} />
    </div>
  );
}
