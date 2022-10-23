import React from "react"
import style from "./input.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    //...
}

const Input: React.FC<Props> = ({ ...props }) => {
    return (
        <input {...props} className={`${style["input"]} ${props.className}`} />
    )
}

export default Input;