//Libs
import { Divider } from "antd";
import React from "react";
//Css
import style from "./documentation.module.css";
//Sections
import Magazine from "./Sections/Magazine";
import NewEditions from "./Sections/NewEditions";

const Documentation: React.FC = () => {
    return (
        <div className={style["wrapper"]}>
            <section id="magazine">
                <Magazine />
            </section>
            <Divider />
            <section id="new-editions">
                <NewEditions />
            </section>
        </div>
    )
}

export default Documentation;