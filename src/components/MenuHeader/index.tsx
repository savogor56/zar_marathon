import React, {useEffect, useState} from 'react'
// @ts-ignore


import { Menu } from './Menu'
import { Navbar } from './Navbar'
import {Modal} from "../Modal"
import {LoginForm} from "../LoginForm"
import {LoginFormData} from "../../utils/types"
import {useAppDispatch} from "../../store/hooks"
import {signIn, signUp} from "../../store/auth"

interface Props {
  bgActive?: boolean
}

export const MenuHeader:React.FC<Props> = ({ bgActive }) => {
  const [isOpen, setOpen] = useState<boolean | null>(null)
  const [isOpenModal, setOpenModal] = useState<boolean | null>(null)
  const [loginData, setLoginData] = useState<LoginFormData | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp ] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
      if (loginData) {
         if (isSignUp) {
             dispatch(signUp(loginData))
         } else {
             dispatch(signIn(loginData))
         }
      }
  }, [loginData, isSignUp, dispatch])

  const handleClear = () => {
      setPassword('')
      setEmail('')
  }

  const handleMenuOpen = () => {
    setOpen(prevState => !prevState)
  }

  const handleCLickLogin = () => {
      setOpenModal(prevState => !prevState)
      handleClear()
  }

  const handleSubmitLoginForm = (values: LoginFormData) => {
      setLoginData(values)
  }

  return (
    <>
        <Menu toggleOpen={handleMenuOpen} isOpen={isOpen} />
        <Navbar
            toggleOpen={handleMenuOpen}
            isOpen={isOpen}
            bgActive={bgActive}
            onClickLogin={handleCLickLogin}
        />
        <Modal isOpen={isOpenModal} onClose={handleCLickLogin} title={"Log in"}>
            <LoginForm
                onSubmit={handleSubmitLoginForm}
                onClear={handleClear}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isSignUp={isSignUp}
                setIsSignUp={setIsSignUp}
            />
        </Modal>
    </>
  )
}
