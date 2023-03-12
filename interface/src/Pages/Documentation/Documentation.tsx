//Libs
import React from "react";
//Css
import style from "./documentation.module.css";
//Sections
import Magazine from "./Sections/Magazine";

const Documentation: React.FC = () => {
    return (
        <div className={style["wrapper"]}>
            <section id="magazine">
                <Magazine />
            </section>
            <section>
                
            </section>
        </div>
    )
}

export default Documentation;