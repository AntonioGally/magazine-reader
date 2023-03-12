//Libs
import { Divider } from "antd";
import React from "react";
//Css
import style from "./documentation.module.css";
import About from "./Sections/About";
import Editions from "./Sections/Editions";
//Sections
import Magazine from "./Sections/Magazine";
import NewEditions from "./Sections/NewEditions";

//Images
import magazines from "../../static/Images/magazines.png";
import newEditions from "../../static/Images/new-editions.png";
import editions from "../../static/Images/editions.png"

type Props = {
    origin?: "docs" | "landing"
}

const Documentation: React.FC<Props> = ({ origin = "docs" }) => {
    return (
        <div className={style["wrapper"]}>
            <section id="about">
                <About />
            </section>
            {origin === "docs" ? (
                <>
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
                </>
            ) : (
                <>
                    <img src={magazines} style={{ width: "100%", marginBottom: 20 }} />
                    <Divider />
                    <img src={newEditions} style={{ width: "100%", marginBottom: 20 }} />
                    <Divider />
                    <img src={editions} style={{ width: "100%" }} />
                </>
            )}
        </div>
    )
}

export default Documentation;