import React, { useState,useRef } from 'react'
import { LuUser,LuUpload, LuTrash } from 'react-icons/lu';
import Inputs from './Inputs';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            //updtae the image state
            setImage(file);

                
            //generatte a preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreviewUrl(previewUrl);
        }

    }
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if(inputRef.current) {
            inputRef.current.value = null; // Reset the file input
        }
        
    }
    const onChooseFile = () => {
        inputRef.current.click();
    }


  return (
    <div className='flex justify-center mb-6'> 
    <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'    
    
    />

    {
        !image ? (
            <div className='w-24 h-24 flex items-center justify-center bg-purple-100 rounded-full relative shadow'>
                <LuUser className='text-4xl text-purple-500'/>

                <button
                    type='button'
                    className='w-8 h-8 items-center justify-center bg-purple-600 text-white rounded-full absolute -bottom-1 -right-1 flex'
                    onClick={onChooseFile}
                    >
                        <LuUpload />
                </button>
            </div>
        ) : (
            <div className="relative">
                <img 
                    src={previewUrl} 
                    alt="profile photo" 
                    className='w-24 h-24 rounded-full object-cover border-purple-400 shaodow'
                />
                <button 
                    type='button' 
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow hover:bg-red-600 transition' 
                    onClick={handleRemoveImage}>
                    <LuTrash/>
                </button>
            </div>
        )
    }
      
    </div>
  )
}

export default ProfilePhotoSelector
