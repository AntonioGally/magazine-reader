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
import NewMagazine from "../../Modals/NewMagazine/NewMagazine";

const Magazines: React.FC = () => {
    const [listContent, setListContent] = useState<card[]>();
    const [newMagazineModal, setNewMagazineModal] = useState<boolean>(false);

    useEffect(() => {
        setListContent(api.listOfContent);
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