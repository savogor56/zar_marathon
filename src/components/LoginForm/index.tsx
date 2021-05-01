import React, {ChangeEvent, ReactEventHandler} from "react"

import {LoginFormData} from "../../utils/types"
import {Input} from "./components/Input"

import classes from "./style.module.css"

interface Props {
    onSubmit: (values: LoginFormData) => void
    email: string
    password: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>
    onClear: () => void
    isSignUp: boolean
    setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginForm: React.FC<Props> = ({ onSubmit, password, email,
    setPassword, setEmail, onClear, isSignUp, setIsSignUp }) => {


    const handleSubmit: ReactEventHandler = (event) => {
        event.preventDefault()
        onSubmit && onSubmit({
            email, password
        })
        onClear()
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break
        }
    }

    const handleFormChange = () => {
        setIsSignUp && setIsSignUp(!isSignUp)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input type={"text"} name={"email"} onChange={handleInputChange} value={email} label={"Email"} required />
            <Input type={"password"} name={"password"} onChange={handleInputChange} value={password} label={"Password"} required />
            <div className={classes.btnWrapper}>
                <button>
                    {isSignUp ? 'sign up' : 'sign in'}
                </button>
                <div className={classes.changeBtn} onClick={handleFormChange}>
                    {isSignUp ? 'Login' : 'Register' }?
                </div>
            </div>
        </form>
    )
}