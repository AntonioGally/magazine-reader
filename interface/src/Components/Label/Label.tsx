import React, { CSSProperties } from "react";
import style from "./label.module.css"

interface Props {
    label?: string | number;
    children?: JSX.Element;
    className?: string;
    style?: CSSProperties;
}


const Label: React.FC<Props> = ({ label, children, ...props }) => {
    return (
        <label className={`${style["label"]} ${props.className}`} {...props}>
            {label || children}
        </label>
    )
};

export default Label;