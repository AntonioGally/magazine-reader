import React from "react";

const About: React.FC = () => {
    return (
        <>
            <h1>Sobre o Obclio</h1>
            <p>
                Obclio é uma plataforma de revistas com o intuito de listar novas edições de várias revistas ao mesmo tempo.
                É possível cadastrar e configurar qualquer revista e listar suas edições, tendo a funcionalidade de escanear
                as revistas e notificar se alguma edição nova foi lançada ou não.
            </p>
            <p>
                Foi desenvolvida por <a href="https://github.com/AntonioGally" target="_blank">Antônio Gally</a> e idealizada por {" "}
                <a href="https://www.resenhacritica.com.br/sobre/" target="_blank">Itamar Freitas</a>.
            </p>
        </>
    )
}

export default About;