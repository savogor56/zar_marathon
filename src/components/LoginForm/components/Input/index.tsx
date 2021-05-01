import classes from "./style.module.css"
import React, {ChangeEvent} from "react"
import cn from "classnames"

interface Props {
    type: string
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    required: boolean
    label: string
}

export const Input: React.FC<Props> = ({ type, name, onChange, value, required, label }) => {
    return (
        <div className={classes.root}>
            <input
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                className={cn(classes.input, {
                    [classes.valid]: !!value
                })}
                required={required}
            />
            <span className={classes.highlight} />
            <span className={classes.bar} />
            <label className={classes.label}>{label}</label>
        </div>
    )
}