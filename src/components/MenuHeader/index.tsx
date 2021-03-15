import React, { useState } from 'react'
import { Menu } from './Menu'
import { Navbar } from './Navbar'

export const MenuHeader = () => {
  const [isOpen, setOpen] = useState(false)
  
  const handleMenuOpen = (isOpen: boolean) => {
    setOpen(!isOpen)
  }

  return (
    <>
      <Navbar toggleOpen={handleMenuOpen} isOpen={isOpen} />
      <Menu isOpen={isOpen} /> 
    </>
  )
}
