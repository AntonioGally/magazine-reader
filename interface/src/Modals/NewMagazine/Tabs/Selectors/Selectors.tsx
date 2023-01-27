import React from "react";
//Components
import { Divider, Tag } from "antd";
import Label from "../../../../Components/Label/Label";
import Input from "../../../../Components/Input/Input";
//Css
import style from "./Selectors.module.css";
import TextArea from "antd/lib/input/TextArea";
import Button from "../../../../Components/Button/Button";

const Selectors: React.FC = () => {
    return (
        <div className={style["wrapper"]}>
            <Label label={"Templates:"} />
            <div className={style["tag-area"]}>
                <Tag>
                    OJS
                </Tag>
            </div>
            <div>
                <Label label={"Nome do seletor:"} />
                <Input />
            </div>
            <div>
                <Label label={"URL do SiteMap:"} />
                <Input />
            </div>
            {/* <Divider /> */}
            <div style={{ marginBottom: 10 }}>
                <Label label={"Pesquisar por:"} />
                <Input placeholder="" />
            </div>
           
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button _type="primary" style={{ margin: "10px 0" }}>
                    <span>Cadastrar</span>
                </Button>
            </div>
        </div>
    )
}

export default Selectors;