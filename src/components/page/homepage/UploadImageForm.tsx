'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { FormEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function UploadImageForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [file_url, setfile_url] = useState<string | undefined>(undefined)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    toast.loading('Uploading image...')
    setisLoading(true)

    const formData = new FormData(event.currentTarget)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    if (data.success) {
      setisLoading(false)
      toast.dismiss()
      toast.success('Image uploaded successfully')
      const fileURL = `http://localhost:3000${data.file_url}`
      setfile_url(fileURL)

      console.log(fileURL)
    }
  }
  return (
    <div className='container pt-20 mx-auto'>
      <h2 className='text-center mb-10 text-4xl font-light'>
        Upload image with Telegram API
      </h2>

      <form
        onSubmit={onSubmit}
        className='space-y-4 flex flex-col items-center justify-center'
      >
        <Button
          type='button'
          variant='outline'
          className='bg-purple-500 hover:bg-purple-500/90 text-white border-0 hover:text-white h-12 px-12 rounded-full'
          onClick={() => inputRef.current?.click()}
        >
          ✔ Select Image
        </Button>
        <Input
          name='file'
          type='file'
          accept='image/*'
          className='hidden'
          ref={inputRef}
        />

        <Button type='submit' className='px-16' disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Image'}
          <span className='mb-1'>&uarr;</span>
        </Button>
      </form>

      {file_url && (
        <div className='flex flex-col items-center justify-center gap-y-3 mt-16'>
          <Image
            src={file_url}
            alt='Uploaded image'
            width={500}
            height={500}
            className='w-full max-w-lg block h-auto'
          />
          <Button
            type='button'
            onClick={() => {
              navigator.clipboard.writeText(file_url)
              toast.success('Image URL copied to clipboard')
            }}
          >
            Copy to Clipboard
          </Button>
        </div>
      )}
    </div>
  )
}
