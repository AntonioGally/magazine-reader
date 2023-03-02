import React, { useState } from "react";
import ComboBox from "../../../../Components/ComboBox/ComboBox";
//Components
import Input from "../../../../Components/Input/Input";
import Label from "../../../../Components/Label/Label";
import TextArea from "../../../../Components/TextArea/TextArea";
import { getMagazineUpdatePeriods } from "../../../../scripts/utils";
//Css
import style from "./Informations.module.css";

type Props = {
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

const Informations: React.FC<Props> = ({ setPeriod }) => {
    const [imageUrl, setImageUrl] = useState("");
    return (
        <div className={style["wrapper"]}>
            <div style={{ display: "flex" }}>
                <img src={imageUrl} className={style["image"]} />
                <div className={style["title-desc-wrapper"]}>
                    <div>
                        <Label label={"Título:"} />
                        <Input placeholder="" required name="title" />
                    </div>
                    <div>
                        <Label label={"Descrição:"} />
                        <TextArea rows={4} name="description" />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Label label={"Imagem:"} />
                <Input placeholder="http://..." required name="magazineImage"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <div>
                <Label label={"URL:"} />
                <Input placeholder="http://..." required name="magazineUrl" />
            </div>
            <div>
                <Label label={"Período de atualização:"} />
                <ComboBox options={getMagazineUpdatePeriods()} onChange={(value) => setPeriod(value)} />
            </div>
        </div>
    )
}

export default Informations;