import { Spin } from "antd";
import React from "react";

type Props = {
    message?: string
}

const Loading: React.FC<Props> = ({ message }) => {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10%" }}>
            <Spin size="large" tip={<span>{message || "Carregando..."}</span>} />
        </div>
    )
}

export default Loading;