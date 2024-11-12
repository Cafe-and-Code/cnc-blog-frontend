import { useRef, useState } from 'react';

import '@/styles/components/upload-image.scss'

import BaseDialog from '@/components/base/BaseDialog';
import { Input } from "@/components/ui/input";

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
        try {
            const input = event.target
            if (input.files && input.files[0]) {
                const reader = new FileReader()
                reader.onload = (e: any) => {
                    setAvatar(e.target.result)
                    setImage(e.target.result)
                    if (onChange) {
                        onChange(event);
                    }
                }
                reader.readAsDataURL(input.files[0])
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
            {isAvatar && <img onClick={handleClick} className="avatar-pic" src={avatar} rel="preload" />}
            {!isAvatar && <img onClick={handleClick} className="image-pic" src={image} rel="preload" />}
            <Input ref={inputRef} className="file-upload" id="picture" type="file" onChange={handleUploadImage} accept="image/*" />
            <BaseDialog
                dialogList={dialogList}
                onSubmit={handleSubmit}
            />
        </div>
    )
}