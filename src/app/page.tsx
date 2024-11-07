import UploadImageForm from '@/components/page/homepage/UploadImageForm'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div className='bg-gradient-to-br from-fuchsia-300 to-cyan-400 min-h-screen'>
      <UploadImageForm />
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  )
}
