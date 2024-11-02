import { useRef,useState } from 'react';

import '@/styles/components/upload-image.scss'

import BaseDialog from '@/components/base/BaseDialog';

import { Input } from "../ui/input";

type uploadImageType = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function uploadImage({ onChange }: uploadImageType) {
    const [avatar, setAvatar] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [title, setTilte] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);

    const handleUploadImage = (event: any) => {
        try {
            const input = event.target
            if (input.files && input.files[0]) {
                const reader = new FileReader()
                reader.onload = (e: any) => {
                    setAvatar(e.target.result)
                    if (onChange) {
                        onChange(event);
                    }
                }
                reader.readAsDataURL(input.files[0])
            }
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

    const handleClick = () => {
        inputRef.current?.click()
    }
    return (
        <div className="avatar-wrapper">
            <img onClick={handleClick} className="profile-pic" src={avatar} rel="preload" />
            <Input ref={inputRef} className="file-upload" id="picture" type="file" onChange={handleUploadImage} accept="image/*" />
            <BaseDialog
                title={title}
                visible={isOpen}
                message={message}
                submitBtn='Submit'
                onSubmit={handleSubmit}
            />
        </div>
    )
}