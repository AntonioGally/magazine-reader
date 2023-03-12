import React from "react";
import magazineScan from "../../../static/Images/magazine-scan.png";

const NewEditions: React.FC = () => {
    return (
        <>
            <h1>Cadastrando novas edições</h1>
            <p>
                Para cadastrar novas edições, a plataforma possui um sistema de filtros, para que seja possível ler edições de
                revistas específicas, filtrando por períodos de atualização. Por exmeplo: se nós sabemos que uma revista posta novas
                edições de mês em mês, então não preciso verificar se ela tem novas edições todos os dias.
            </p>
            <img src={magazineScan} />
            <p>
                Nesse cenário, se eu <code>escanear</code> sem nenhum período selecionado, a plataforma irá entrar <b>em todas as revistas</b> {" "}
                procurando por novas edições.
            </p>
            <p>
                No processo de cadastro, é possível visualizar uma tabela de possíveis novas edições. Se essa tabela estiver vazia, signififca que nenhuma
                edição nova foi encontrada. Temos também uma tabela de revistas que obtiveram erro ao serem consultadas. Nesse caso, vale rever o cadastro da mesma.
            </p>
        </>
    )
}

export default NewEditions;