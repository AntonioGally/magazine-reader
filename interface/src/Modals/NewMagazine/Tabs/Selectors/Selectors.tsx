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
                <Label label={"Container"} />
                <Input />
            </div>
            <div>
                <Label label={"Edição"} />
                <Input />
            </div>
            <Divider />
            <div style={{ display: "flex" }}>
                <img src="#" className={style["image"]} />
                <div className={style["title-desc-wrapper"]}>
                    <div>
                        <Label label={"Título:"} />
                        <Input placeholder="" name="title" />
                    </div>
                    <div>
                        <Label label={"Descrição:"} />
                        <TextArea rows={3} />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Label label={"Imagem:"} />
                <Input placeholder="" name="image" />
            </div>
            <div>
                <Label label={"URL:"} />
                <Input placeholder="" name="url" />
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