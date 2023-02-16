//Libs
import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import Button from "../../Components/Button/Button";
import { Input } from "antd";
import Card from "./Components/Card";
import NewMagazine from "../../Modals/NewMagazine/NewMagazine";
import MagazineInfo from "../../Modals/MagazineInfo/MagazineInfo";
//Scripts
import authHttp from "../../scripts/authHttp";
//Css
import style from "./Magazines.module.css";
import { magazineType } from "./magazines.types";
//Assets
import { SearchOutlined } from '@ant-design/icons';

const Magazines: React.FC = () => {
    const [newMagazineModal, setNewMagazineModal] = useState<boolean>(false);
    const [magazineInfo, setMagazineInfo] = useState<{ active: boolean; magazineData: magazineType | null }>();
    const [searchInput, setSearchInput] = useState("");


    const { isLoading, error, data, isFetching } = useQuery<magazineType[]>("magazineList", () =>
        authHttp
            .get("/magazine")
            .then((res) => res.data)
    );

    if (isLoading || !data) return <span>Loading...</span>
    if (error) return <span>An error has occurred</span>;

    const filteredCard = data.filter(card => {
        let _name = card.magazinename.trim().toLowerCase();
        let _search = searchInput.trim().toLowerCase();
        return _name.indexOf(_search) > -1;
    })

    return (
        <div className={style["magazine-wrapper"]}>
            <div>
                <Button label={"Nova revista"} _type="secondary" onClick={() => setNewMagazineModal(true)} />
            </div>
            <div className={style["input-search-wrapper"]}>
                <Input size="middle" prefix={<SearchOutlined />} type={"text"}
                    onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
            </div>
            <div className={style["card-wrapper"]}>
                {filteredCard.map((value, index) => (
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