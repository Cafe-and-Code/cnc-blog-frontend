import { useRef, useState } from 'react';

import '@/styles/components/upload-image.scss';

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
    <div className={`avatar-wrapper ${classCustom}`}>
      {isAvatar && (
        <img
          onClick={handleClick}
          className="avatar-pic"
          alt=""
          src={avatar}
          rel="preload"
        />
      )}
      {!isAvatar && (
        <img
          onClick={handleClick}
          className="image-pic"
          alt=""
          src={image}
          rel="preload"
        />
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
