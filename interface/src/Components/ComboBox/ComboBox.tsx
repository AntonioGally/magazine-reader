import React from "react";
import { Select, SelectProps } from "antd";
import style from "./comboBox.module.css";

const ComboBox: React.FC<SelectProps> = (props) => {
    return (
        <Select className={`${style["select"]} ${props.className}`} {...props} />
    )
}

export default ComboBox;