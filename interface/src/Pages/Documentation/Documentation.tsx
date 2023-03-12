//Libs
import { Divider } from "antd";
import React from "react";
//Css
import style from "./documentation.module.css";
import Editions from "./Sections/Editions";
//Sections
import Magazine from "./Sections/Magazine";
import NewEditions from "./Sections/NewEditions";

const Documentation: React.FC = () => {
    return (
        <div className={style["wrapper"]}>
            <section id="about">
        
            </section>
            <section id="magazine">
                <Magazine />
            </section>
            <Divider />
            <section id="new-editions">
                <NewEditions />
            </section>
            <Divider />
            <section id="editions">
                <Editions />
            </section>
        </div>
    )
}

export default Documentation;