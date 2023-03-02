import React, { useMemo } from "react";
import ComboBox from "../../../../Components/ComboBox/ComboBox";
import Input from "../../../../Components/Input/Input";
import Label from "../../../../Components/Label/Label";
import TextArea from "../../../../Components/TextArea/TextArea";
//type
import { magazineType } from "../../../../Pages/Magazines/magazines.types";
import { getMagazineUpdatePeriods } from "../../../../scripts/utils";
//Css
import style from "./informations.module.css";

type Props = {
    magazineInfo: magazineType;
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

const Informations: React.FC<Props> = ({ magazineInfo, setPeriod }) => {

    return (
        <div className={style["wrapper"]}>
            <div style={{ display: "flex" }}>
                <img src={magazineInfo.magazineimage} className={style["image"]} />
                <div className={style["title-desc-wrapper"]}>
                    <div>
                        <Label label={"Título:"} />
                        <Input placeholder="" required name="title" defaultValue={magazineInfo.magazinename} />
                    </div>
                    <div>
                        <Label label={"Descrição:"} />
                        <TextArea rows={4} name="description" defaultValue={magazineInfo.magazinedescription} />
                    </div>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div className={style["col"]} style={{ marginRight: "2%" }}>
                    <div style={{ marginBottom: 10 }}>
                        <Label label={"Imagem:"} />
                        <Input placeholder="http://..." required name="magazineImage" defaultValue={magazineInfo.magazineimage} />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <Label label={"URL:"} />
                        <Input placeholder="http://..." required name="magazineUrl" defaultValue={magazineInfo.magazineurl} />
                    </div>
                    <div>
                        <Label label={"Período de atualização:"} />
                        <ComboBox onChange={(value) => setPeriod(value)} defaultValue={magazineInfo.magazineupdateperiod}
                            options={getMagazineUpdatePeriods()}
                        />
                    </div>
                </div>


                <div className={style["col"]}>
                    <div style={{ marginBottom: 10 }}>
                        <Label label={"Sitemap:"} />
                        <Input required name="sitemap" defaultValue={magazineInfo.magazinesitemap} />
                    </div>
                    <div>
                        <Label label={"Pesquisar por:"} />
                        <Input required name="indexof" defaultValue={magazineInfo.magazineindexof} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Informations;