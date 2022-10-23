import React from "react";
import style from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string | number;
    _type: "primary" | "secondary";
}
type mapType = {
    [key: string]: {
        backgroundColor: string;
        color: string;
    }
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
        }
    }

    return (
        <button {...props} style={{ ...buttonType[_type], ...props.style }}>
            {label || children}
        </button>
    );
}