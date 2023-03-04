import React, { useState } from "react";
//Components
import Label from "../../../../Components/Label/Label";
import Input from "../../../../Components/Input/Input";
//Css
import style from "./Selectors.module.css";
import { Divider, Switch } from "antd";

type Props = {
    siteMapExists: boolean;
    setSiteMapExists: React.Dispatch<React.SetStateAction<boolean>>;
}

const Selectors: React.FC<Props> = ({ siteMapExists, setSiteMapExists }) => {

    return (
        <div className={style["wrapper"]}>
            <div>
                <Label label={"O site possui sitemap:"} style={{ marginRight: 10 }} />
                <Switch checked={siteMapExists} onChange={setSiteMapExists} />
            </div>
            <div style={{ marginTop: 12 }}>
                <Label label={siteMapExists ? "Link do sitemap" : "Link da listagem de edições"} />
                <Input name="sitemap" />
            </div>
            <Divider />
            <div style={{ marginBottom: 10 }}>
                <Label label={"Pesquisar por:"} />
                <Input placeholder="" name="_indexOf" />
            </div>
        </div>
    )
}

export default Selectors;