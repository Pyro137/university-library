"use client";

import { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from "@/hooks/use-toast";

const {env: {imagekit: {publicKey,urlEndPoint} } }=config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error:any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({onFileChanged}:{onFileChange:(filePath:string)=>void}) => {
  const ikUploadRef=useRef(null)
  const [file,setFile]=useState<{filePath:string}|null>(null)

  const onError = (error:any) => {
    console.log(error)
    toast({
      title: `upload failed`,
      description: `Your could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  }

  const onSuccess = (res:any) => {
    setFile(res)
    onFileChanged(res.filePath)
    toast({
      title: `Nice`,
      description: `Nice`,
    });
  }
  console.log(urlEndPoint)
  return (
    <ImageKitProvider urlEndpoint={urlEndPoint} publicKey={publicKey} authenticator={authenticator}>

      <IKUpload 
        className='hidden' 
        ref={ikUploadRef} 
        onError={onError} 
        onSuccess={onSuccess}
        fileName="test-upload.jpg"

      />
      <button className='upload-btn' onClick={(e)=>{
        e.preventDefault();
        if(ikUploadRef.current){
          // @ts-ignore
          ikUploadRef.current?.click();
        }
      }}>
        <Image src={"icons/upload.svg"} alt='upload-icon' width={20} height={20} className='object-contain'/>
        <p className='text-base text-light-100'>Upload File</p>
        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>
      {file && (
          <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />)}
   </ImageKitProvider>
  )
}

export default ImageUpload
