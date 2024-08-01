import { Sidebar } from '../components'

export default function DefaultLayout({ children }) {
  return (
    <div className='flex h-screen overflow-hidden items-start '>
      <Sidebar />
      <main className='w-full'>{children}</main>
    </div>
  )
}