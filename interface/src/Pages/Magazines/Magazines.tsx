//Libs
import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import Button from "../../Components/Button/Button";
import { Input, Pagination } from "antd";
import Card from "./Components/Card";
import NewMagazine from "../../Modals/NewMagazine/NewMagazine";
import MagazineInfo from "../../Modals/MagazineInfo/MagazineInfo";
//Scripts
import authHttp from "../../scripts/authHttp";
//Css
import style from "./Magazines.module.css";
import { magazineType, paginatedMagazine } from "./magazines.types";
//Assets
import { SearchOutlined } from '@ant-design/icons';
import Loading from "../../Components/Loading/Loading";

const Magazines: React.FC = () => {
    const [newMagazineModal, setNewMagazineModal] = useState<boolean>(false);
    const [magazineInfo, setMagazineInfo] = useState<{ active: boolean; magazineData: magazineType | null }>();

    const [searchInputTimeout, setSearchInputTimeout] = useState<any>(null)
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");

    const [page, setPage] = useState(1);


    const { isLoading, error, data, isFetching } = useQuery<paginatedMagazine>(["magazineList", page, query], () =>
        authHttp
            .get(`/magazines/paginated?page=${page}&limit=20&q=${query}`)
            .then((res) => res.data)
    );

    if (isLoading || !data) return <Loading message="Listando revistas" />
    if (error) return <span>An error has occurred</span>;

    function handleSearchInput(value: string) {
        setSearchInput(value);
        if (searchInputTimeout) {
            clearTimeout(searchInputTimeout)
        }
        setSearchInputTimeout(setTimeout(() => setQuery(value), 300))
    }

    return (
        <div className={style["magazine-wrapper"]}>
            <div>
                <Button label={"Nova revista"} _type="secondary" onClick={() => setNewMagazineModal(true)} />
            </div>
            <div className={style["input-search-wrapper"]}>
                <Input size="middle" prefix={<SearchOutlined />} type={"text"}
                    onChange={(e) => handleSearchInput(e.target.value)} value={searchInput} />
            </div>
            <div className={style["card-wrapper"]}>
                {data.results.map((value, index) => (
                    <Card {...value} key={index}
                        onClick={() => setMagazineInfo({ active: true, magazineData: value })}
                    />
                ))}
            </div>

            <div className={style["pagination-wrapper"]}>
                <Pagination defaultCurrent={1} current={page} onChange={setPage} total={data.totalRecords}
                    showTotal={(total) => <span className={style["pagination-total"]}>{total}</span>}
                    defaultPageSize={20} showSizeChanger={false}
                />
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