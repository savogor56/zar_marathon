import React, { useState } from 'react'
import { Menu } from './Menu'
import { Navbar } from './Navbar'

interface Props {
  bgActive?: boolean
}

export const MenuHeader:React.FC<Props> = ({ bgActive }) => {
  const [isOpen, setOpen] = useState<boolean | null>(null)
  
  const handleMenuOpen = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <>
      <Navbar toggleOpen={handleMenuOpen} isOpen={isOpen} bgActive={bgActive} />
      <Menu toggleOpen={handleMenuOpen} isOpen={isOpen} /> 
    </>
  )
}
