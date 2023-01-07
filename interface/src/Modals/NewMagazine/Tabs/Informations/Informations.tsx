import React from "react";
//Components
import Input from "../../../../Components/Input/Input";
import Label from "../../../../Components/Label/Label";
import TextArea from "../../../../Components/TextArea/TextArea";
//Css
import style from "./Informations.module.css";

const Informations: React.FC = () => {
    return (
        <div className={style["wrapper"]}>
            <div style={{ display: "flex" }}>
                <img src="#" className={style["image"]} />
                <div className={style["title-desc-wrapper"]}>
                    <div>
                        <Label label={"Título:"} />
                        <Input placeholder="" required name="title" />
                    </div>
                    <div>
                        <Label label={"Descrição:"} />
                        <TextArea rows={4} />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Label label={"Imagem:"} />
                <Input placeholder="" required name="image" />
            </div>
            <div>
                <Label label={"URL:"} />
                <Input placeholder="" required name="url" />
            </div>
        </div>
    )
}

export default Informations;