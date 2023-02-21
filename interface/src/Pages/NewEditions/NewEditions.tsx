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
import { sliceIntoChunks } from "../../scripts/utils";
//Css
import style from "./newEditions.module.css";
//Types
import { magazineType } from "../Magazines/magazines.types";
import { ColumnsType } from "antd/lib/table";
import { newEditionType } from "./newEditions.types";
//Store
import { clearNewEditions, setNewEditions } from "../../store/newEditions/newEditions.action";
import { RootState } from "../../store/store";
import { promiseSuccess } from "../../@types/general";
import { Button } from "antd";

const NewEditions: React.FC = () => {
    const editionsArray = useSelector((state: RootState) => state.newEditions.editionsArray)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({ magazineName: [""], loading: false });

    const magazineQuery = useQuery<magazineType[]>("magazineList", {
        queryFn: () => authHttp.get("/magazines").then((res) => res.data)
    })

    function getEditons(magazineId: string): Promise<promiseSuccess<newEditionType[]>> {
        return authHttp.post("/editions", { magazineId })
    }

    async function fetchEditions(magazines: magazineType[]) {
        let requestChunk: magazineType[][] = sliceIntoChunks(magazines, 3);
        for (let chunkIdx = 0; chunkIdx < requestChunk.length; chunkIdx++) {
            let chunk = requestChunk[chunkIdx]
            setLoading({ magazineName: chunk.map(c => c.magazinename), loading: true })
            try {
                const [edition0, edition1, edition2] = await Promise.all([getEditons(chunk[0].magazineid), getEditons(chunk[1].magazineid), getEditons(chunk[2].magazineid)])
                dispatch(setNewEditions([...edition0.data, ...edition1.data, ...edition2.data]))
            } catch (err) {
                toast.error("Não foi possível cadastrar edições")
                console.error(err)
            }
            setLoading({ magazineName: [""], loading: false })
        }
    }

    useEffect(function () {
        if (!magazineQuery.data || editionsArray) return;
        fetchEditions(magazineQuery.data);
    }, [magazineQuery.data])

    const getColumns: ColumnsType<newEditionType> = [
        {
            title: "Revista",
            dataIndex: "magazineName",
            render: (text, record) => <a target={"_blank"} href={record.magazineUrl}>{text}</a>,
        },
        {
            title: "Nova edição",
            dataIndex: "newEdition",
            render: (text, record) => <a target={"_blank"} href={record.newEdition}>{text.split("/").at(-1)}</a>
        },
    ];

    return (
        <div className={style["wrapper"]}>
            <div style={{ marginBottom: 20 }}>
                <Button onClick={() => {
                    dispatch(clearNewEditions())
                    fetchEditions(magazineQuery.data as magazineType[]);
                }} type="primary">
                    Escanear
                </Button>
            </div>
            <Table columns={getColumns} data={editionsArray} />
            {loading.loading && (
                <>
                    <div className={style["loading-wrapper"]}>
                        <span>Carregando edições das revistas:</span>
                        <ul>
                            {loading.magazineName.map(magazineName => (
                                <li>{magazineName}</li>
                            ))}
                        </ul>
                    </div>
                    <Loading message="" />
                </>
            )}
        </div>
    )
}

export default NewEditions;