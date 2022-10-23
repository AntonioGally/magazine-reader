//Libs
import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
//Interface
import { card } from "../../@types/magazine";
//Scripts
import { api } from "./api";
//Css
import style from "./Magazines.module.css";
import Card from "./Card";

const Magazines: React.FC = () => {
    const [listContent, setListContent] = useState<card[]>()

    useEffect(() => {
        setListContent(api.listOfContent);
    }, []);

    if (!listContent) return <span>Loading...</span>

    return (
        <div className={style["magazine-wrapper"]}>
            <div>
                <Button label={"Nova revista"} _type="secondary" />
            </div>
            <div className={style["card-wrapper"]}>
                {listContent.map((value, index) => (
                    <Card {...value} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Magazines;