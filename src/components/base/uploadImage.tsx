import { Input } from "../ui/input";
import { useState, useRef } from 'react';
import '@/styles/components/upload-image.scss'

type uploadImageType = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function uploadImage({onChange}: uploadImageType) {
    const [avatar, setAvatar] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);

    const handleUploadImage = (event: any) => { 
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
      }
    const handleClick = () => {
        inputRef.current?.click()
    }
    return (
        <div className="avatar-wrapper">
            <img onClick={handleClick} className="profile-pic" src={avatar} rel="preload" />
            <Input ref={inputRef} className="file-upload" id="picture" type="file" onChange={handleUploadImage} accept="image/*"/>
        </div>
    )
}