import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import logo from '@/assets/merzigo-logo.png'
export default function Navbar() {
  return (
    <nav className='w-full p-2 h-[40px]'>
      <header className='max-w-5xl mx-auto flex border-b-2 border-solid border-border pb-2'>
        <Link to={'/'} className='mr-auto'>
          <img src={logo} alt='logo' className='rounded-md w-full h-[40px] aspect-square' />
        </Link>
        <Button asChild variant='link'>
          <Link to={'/products'}>Products</Link>
        </Button>
        <Button asChild variant='link'>
          <Link to={'/services'}>
            Services
          </Link>
        </Button>
        <Button asChild variant='link'>
          <Link to={'/films'}>
            Films
          </Link>
        </Button>
        <ModeToggle className='ml-auto' />
      </header>
    </nav>
  )
}
