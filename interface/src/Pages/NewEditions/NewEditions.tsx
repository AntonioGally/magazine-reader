//Libs
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueries, useQuery } from "react-query";
//Components
import Table from "../../Components/Table/Table";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
//Scripts
import authHttp from "../../scripts/authHttp";
import { getFormattedDate, getMagazineUpdatePeriods, getPath, sliceIntoChunks } from "../../scripts/utils";
//Css
import style from "./newEditions.module.css";
//Types
import { magazineType } from "../Magazines/magazines.types";
import { ColumnsType } from "antd/lib/table";
import { newEditionType } from "./newEditions.types";
//Store
import { clearNewEditions, setNewEditions, setFailedMagazines, clearFailedMagazines } from "../../store/newEditions/newEditions.action";
import { RootState } from "../../store/store";
import { promiseSuccess } from "../../@types/general";
import { Button, Progress } from "antd";
import ComboBox from "../../Components/ComboBox/ComboBox";
import Label from "../../Components/Label/Label";

const NewEditions: React.FC = () => {
    const { editionsArray, failedMagazines } = useSelector((state: RootState) => state.newEditions)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({ magazineName: [""], loading: false });
    const [magazinePercent, setMagazinePercent] = useState(0);
    const [magazinePeriod, setMagazinePeriod] = useState("");

    const magazineQuery = useQuery<magazineType[]>("magazineList", {
        queryFn: () => authHttp.get("/magazines").then((res) => res.data)
    })

    function getEditons(magazineId: string): Promise<promiseSuccess<newEditionType[]>> {
        return new Promise((resolve, reject) => {
            authHttp.post("/editions", { magazineId })
                .then((data) => {
                    dispatch(setNewEditions(data.data))
                    resolve(data.data)
                })
                .catch((err) => {
                    dispatch(setFailedMagazines(err.response.data.magazineInfo))
                    toast.error("Não foi possível cadastrar edições da revista" + err.response.data.magazineInfo.magazinename)
                    reject(err)
                })
        })
    }

    async function fetchEditions(magazines: magazineType[]) {
        let requestChunk: magazineType[][] = sliceIntoChunks(magazines, 3);
        for (let chunkIdx = 0; chunkIdx < requestChunk.length; chunkIdx++) {
            let chunk = requestChunk[chunkIdx];
            setMagazinePercent(Math.floor(((chunkIdx + 1) * 100) / requestChunk.length));

            setLoading({ magazineName: chunk.map(c => c.magazinename), loading: true })
            try {
                await Promise.all(chunk.map(ch => getEditons(ch.magazineid)))
                setLoading({ magazineName: [""], loading: false })
            } catch {
                setLoading({ magazineName: [""], loading: false })
            }
        }
    }

    function handleScan() {
        dispatch(clearNewEditions());
        dispatch(clearFailedMagazines());
        if (magazinePeriod === "")
            fetchEditions(magazineQuery.data as magazineType[]);
        else {
            let filteredMagazines = (magazineQuery.data as magazineType[]).filter((magazine) => magazine.magazineupdateperiod === magazinePeriod)
            fetchEditions(filteredMagazines);
        }
    }

    const getColumns: ColumnsType<newEditionType> = [
        {
            title: "Revista",
            dataIndex: "magazineName",
            render: (text, record) => <a target={"_blank"} href={record.magazineUrl}>{text}</a>,
        },
        {
            title: "Nova edição",
            dataIndex: "newEdition",
            render: (text, record) => <a target={"_blank"} href={record.newEdition}>{text.split("/").at(-1) || getPath(text)}</a>,
            sorter: (a, b) => {
                let _a = a.newEdition.toLowerCase().trim();
                let _b = b.newEdition.toLowerCase().trim();
                return _a.localeCompare(_b);
            }
        },
    ];

    const getLogTableColumns: ColumnsType<magazineType> = [
        {
            title: "Revista",
            dataIndex: "magazinename",
            render: (text, record) => <a target={"_blank"} href={record.magazineurl}>{text}</a>,
        },
        {
            title: "Data de criação",
            dataIndex: "magazinecreateddate",
            render: (text, record) => <span>{getFormattedDate(record.magazinecreateddate).dateString}</span>,
        },
        {
            title: "Id",
            dataIndex: "magazineid",
        }
    ]

    return (
        <div className={style["wrapper"]}>
            <div className={style["scan-area"]}>
                <div>
                    <Label label={"Período de atualização:"} />
                    <ComboBox options={getMagazineUpdatePeriods()} onChange={setMagazinePeriod} value={magazinePeriod} />
                </div>
                <Button onClick={handleScan} type="primary">
                    Escanear
                </Button>
            </div>
            <Table columns={getColumns} data={editionsArray} title={"Novas edições cadastradas"} />
            {loading.loading && (
                <>
                    <div className={style["loading-wrapper"]}>
                        <Progress percent={magazinePercent} style={{ width: "40%", marginTop: 10 }} />
                        <span>Carregando edições das revistas:</span>
                        <ul>
                            {loading.magazineName.map(magazineName => (
                                <li>{magazineName}</li>
                            ))}
                        </ul>
                    </div>
                    <Loading message="" style={{ marginTop: "2%" }} />
                </>
            )}
            {failedMagazines && (
                <div style={{ marginTop: 20 }}>
                    <Table columns={getLogTableColumns} data={failedMagazines} title={"Revistas com erro de cadastro de edição"} />
                </div>
            )}
        </div>
    )
}

export default NewEditions;