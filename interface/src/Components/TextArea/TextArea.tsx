import React from "react"
import style from "./textarea.module.css";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    //...
}

const TextArea: React.FC<Props> = ({ ...props }) => {
    return (
        <textarea {...props} className={`${style["textarea"]} ${props.className}`} />
    )
}

export default TextArea;