//Libs
import React from "react";
//Interface
import { card } from "../../@types/magazine"
//Css
import style from "./Magazines.module.css";

const Card: React.FC<card> = (props) => {
    return (
        <div className={style["card"]}>
            <img src={props.image} alt="Magazine ilustration" />
            <span>{props.title}</span>
        </div>
    )
}

export default Card;