//Libs
import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
//Scripts
import { api } from "./api";
import authHttp from "../../scripts/authHttp";
//Css
import style from "./Magazines.module.css";
import Card from "./Card";
import NewMagazine from "../../Modals/NewMagazine/NewMagazine";
import { promiseSuccess } from "../../@types/promises";
import { magazineType } from "./magazines.types";

const Magazines: React.FC = () => {
    const [listContent, setListContent] = useState<magazineType[]>();
    const [newMagazineModal, setNewMagazineModal] = useState<boolean>(false);

    useEffect(() => {
        authHttp.get("/magazine")
            .then((data: promiseSuccess<magazineType[]>) => {
                setListContent(data.data);
            })
    }, []);

    if (!listContent) return <span>Loading...</span>

    return (
        <div className={style["magazine-wrapper"]}>
            <div>
                <Button label={"Nova revista"} _type="secondary" onClick={() => setNewMagazineModal(true)} />
            </div>
            <div className={style["card-wrapper"]}>
                {listContent.map((value, index) => (
                    <Card {...value} key={index} />
                ))}
            </div>
            {newMagazineModal && (
                <NewMagazine visible={newMagazineModal} closeModal={() => setNewMagazineModal(false)} />
            )}
        </div>
    )
}

export default Magazines;