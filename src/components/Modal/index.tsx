import React, {ReactEventHandler, useEffect, useRef} from "react"

import cn from "classnames"
import classes from "./style.module.css"

interface Props {
    isOpen: boolean | null
    onClose: () => void
    title: string
}

export const Modal: React.FC<Props> = ({isOpen, onClose, title, children}) => {
    const modalEl = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) body.style.overflow = isOpen ? 'hidden' : ''
    }, [isOpen])

    const handleClose = () => {
        onClose && onClose()
    }

    const handleClickRoot: ReactEventHandler = (e) => {
        if (!modalEl.current?.contains(e.target as HTMLDivElement)) {
            handleClose()
        }
    }

    return (
        <div
            className={cn(classes.root, {
                [classes.open]: isOpen
            })}
            onMouseDown={handleClickRoot}
        >
            <div
                ref={modalEl}
                className={classes.modal}
            >
                <div className={classes.head}>
                    { title }
                    <span
                        className={classes.btnClose}
                        onClick={handleClose}
                    />
                </div>
                <div className={classes.content}>
                    { children }
                </div>
            </div>
        </div>
    )
}