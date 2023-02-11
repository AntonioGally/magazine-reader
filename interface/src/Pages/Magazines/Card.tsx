//Libs
import React from "react";
//Interface
import { magazineType } from "./magazines.types";
//Css
import style from "./Magazines.module.css";

const Card: React.FC<magazineType> = (props) => {
    return (
        <div className={style["card"]}>
            <img src={props.magazineimage} alt="Magazine ilustration" />
            <span>{props.magazinename}</span>
        </div>
    )
}

export default Card;