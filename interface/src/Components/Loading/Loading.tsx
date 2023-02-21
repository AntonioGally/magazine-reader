import { Spin } from "antd";
import React, { CSSProperties } from "react";

type Props = {
    message?: string,
    style?: CSSProperties
}

const Loading: React.FC<Props> = ({ message, style }) => {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10%", ...style }}>
            <Spin size="large" tip={<span>{message || "Carregando..."}</span>} />
        </div>
    )
}

export default Loading;