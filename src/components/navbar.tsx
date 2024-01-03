import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import logo from '@/assets/merzigo-logo.png'
import React, { useRef } from 'react'
export default function Navbar() {
  const toggleMenuRef = useRef<HTMLInputElement>(null)
  return (
    <header className='w-full border-b-2 max-w-7xl mx-auto max-sm:flex p-2'>
      <div id="menuToggle" className='sm:hidden peer'>
        <input ref={toggleMenuRef} type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ModeToggle className='sm:hidden ml-auto' />
      <nav className='max-sm:absolute max-sm:bg-background max-sm:hidden max-sm:min-h-0 top-[60px] left-0 w-full z-40 peer-has-[:checked]:max-sm:min-h-[calc(100vh-60px)] peer-has-[:checked]:flex peer-has-[:checked]:flex-col peer-has-[:checked]:gap-16 transition-[all] duration-300'>
        <ul className='flex flex-col sm:flex-row gap-4 sm:gap-0'>
          <li>
            <Link className='max-sm:hidden' to="/">
              <img src={logo} alt="Merzigo" />
            </Link>
          </li>
          <li className='sm:ml-auto'>
            <Button className='max-sm:text-4xl' onClick={() => closeMenuOnClick(toggleMenuRef)} variant={'link'} asChild>
              <Link to={'/products'}>
                Products
              </Link>
            </Button>
          </li>
          <li>
            <Button className='max-sm:text-4xl' onClick={() => closeMenuOnClick(toggleMenuRef)} variant={'link'} asChild>
              <Link to={'/services'}>
                Services
              </Link>
            </Button>
          </li>
          <li>
            <Button className='max-sm:text-4xl' onClick={() => closeMenuOnClick(toggleMenuRef)} variant={'link'} asChild>
              <Link to={'/films'}>
                Films
              </Link>
            </Button>
          </li>
          <li className='max-sm:hidden sm:ml-auto'>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
// Close menu on click
// it shouldn't be triggered when menu is not visible but I leave it as it is for now. It's not a big deal.
function closeMenuOnClick(inputRef: React.RefObject<HTMLInputElement>) {
  if (inputRef.current?.checked) {
    inputRef.current.checked = false
  }
}