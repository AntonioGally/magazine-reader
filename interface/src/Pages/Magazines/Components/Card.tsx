//Libs
import React from "react";
//Interface
import { magazineType } from "../magazines.types";
//Css
import style from "../Magazines.module.css";

type props = magazineType & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Card: React.FC<props> = (props) => {
    return (
        <div className={style["card"]} onClick={props.onClick}>
            <img src={props.magazineimage} alt="Magazine ilustration" />
            <span>{props.magazinename}</span>
        </div>
    )
}

export default Card;