import { useRef, useState } from 'react';

import '@/styles/components/upload-image.scss'

import axios from '@/lib/axios';

import BaseDialog from '@/components/base/BaseDialog';
import { Input } from "@/components/ui/input";

import { API_URL } from '@/app/constant/api-config';

type uploadImageType = {
    isAvatar?: boolean,
    classCustom?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function uploadImage({ isAvatar, classCustom, onChange }: uploadImageType) {
    const [avatar, setAvatar] = useState('')
    const [image, setImage] = useState('')
    const [dialogList, setDialogList] = useState({
        visible: false,
        message: '',
        title: '',
        submitBtn: 'Submit',
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleUploadImage = (event: any) => {
        const input = event.target
        if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = () => {
                getUploadImage(input.files)
            }
            reader.readAsDataURL(input.files[0])
        }
    }

    const getUploadImage = async (files: any) => {
        const file = files[0]
        if (file) {
            try {
                const dataBody = new FormData()
                dataBody.append('file', file)
                dataBody.append('FileName', file.name)
                const response = await axios.post(API_URL.UPLOAD_IMAGE, dataBody, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                )
                setAvatar(response?.data?.filePath)
                setImage(response?.data?.filePath)
                if (onChange) {
                    onChange(response?.data?.filePath);
                }
            } catch (error: any) {
                const data = error?.response?.data
                const messages = data?.errors.join('\n')
                setDialogList((prev) => ({
                    ...prev,
                    visible: true,
                    message: messages,
                    title: 'Error',
                    submitBtn: 'Submit',
                }))
            }
        }
    }

    const handleSubmit = () => {
        setDialogList((prev) => ({
            ...prev,
            visible: false,
        }))
    }

    const handleClick = () => {
        inputRef.current?.click()
    }
    return (
        <div className={`avatar-wrapper ${classCustom}`}>
            {isAvatar && <img onClick={handleClick} className="avatar-pic" alt='' src={avatar} rel="preload" />}
            {!isAvatar && <img onClick={handleClick} className="image-pic" alt='' src={image} rel="preload" />}
            <Input ref={inputRef} className="file-upload" id="picture" type="file" onChange={handleUploadImage} accept="image/*" />
            <BaseDialog
                dialogList={dialogList}
                onSubmit={handleSubmit}
            />
        </div>
    )
}