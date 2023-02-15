//Libs
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
//Components
import Button from "../../Components/Button/Button";
//Scripts
import authHttp from "../../scripts/authHttp";
//Css
import style from "./Magazines.module.css";
import Card from "./Components/Card";
import NewMagazine from "../../Modals/NewMagazine/NewMagazine";
import { promiseSuccess } from "../../@types/promises";
import { magazineType } from "./magazines.types";
import MagazineInfo from "../../Modals/MagazineInfo/MagazineInfo";

const Magazines: React.FC = () => {
    const [newMagazineModal, setNewMagazineModal] = useState<boolean>(false);
    const [magazineInfo, setMagazineInfo] = useState<{ active: boolean; magazineData: magazineType | null }>();


    const { isLoading, error, data, isFetching } = useQuery<magazineType[]>("magazineList", () =>
        authHttp
            .get("/magazine")
            .then((res) => res.data)
    );

    if (isLoading || !data) return <span>Loading...</span>
    if (error) return <span>An error has occurred</span>;

    return (
        <div className={style["magazine-wrapper"]}>
            <div>
                <Button label={"Nova revista"} _type="secondary" onClick={() => setNewMagazineModal(true)} />
            </div>
            <div className={style["card-wrapper"]}>
                {data.map((value, index) => (
                    <Card {...value} key={index}
                        onClick={() => setMagazineInfo({ active: true, magazineData: value })}
                    />
                ))}
            </div>

            {magazineInfo && magazineInfo.magazineData && (
                <MagazineInfo visible={magazineInfo.active} closeModal={() => setMagazineInfo({ active: false, magazineData: null })}
                    magazineInfo={magazineInfo.magazineData} />
            )}

            {newMagazineModal && (
                <NewMagazine visible={newMagazineModal} closeModal={() => setNewMagazineModal(false)} />
            )}
        </div>
    )
}

export default Magazines;