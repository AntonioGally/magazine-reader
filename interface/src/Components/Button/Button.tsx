import React, { CSSProperties } from "react";
import style from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string | number;
    _type: "primary" | "secondary" | "danger";
}
type mapType = {
    [key: string]: CSSProperties
}
const Button: React.FC<Props> = ({ label, _type, children, ...props }) => {

    const buttonType: mapType = {
        "primary": {
            backgroundColor: "#1890FF",
            color: "#FFF"
        },
        "secondary": {
            backgroundColor: "#E6F7FF",
            color: "#1890FF"
        },
        "danger": {
            backgroundColor: "transparent",
            color: "#ff4d4f",
            border: "1px solid #ff4d4f",
        }
    }

    return (
        <button {...props} className={`${style["button"]} ${props.className}`} style={{ ...buttonType[_type], ...props.style }}>
            {label || children}
        </button>
    );
}

export default Button;