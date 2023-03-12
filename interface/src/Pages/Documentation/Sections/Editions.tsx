import React from "react";
import editionsTable from "../../../static/Images/editions-table.png"
const Editions: React.FC = () => {
    return (
        <>
            <h1>Listando edições cadastradas</h1>
            <p>
                Nessa página, temos uma tabela que traz informações de todas as edições cadastradas na plataforma.
            </p>
            <img src={editionsTable} width={"100%"} />
            <p>
                Na tabela, é possível aplicar <b>filtros globais</b> pela caixa de pesquisa, <b>ordens</b> ascentendes e descendentes nas colunas de {" "}
                <code>Url</code> e <code>Data de criação</code>, e por fim, um <b>filtro específico</b> que será aplicado apenas na coluna de {" "}
                <code>Data de criação</code>.
            </p>
        </>
    )
}

export default Editions;