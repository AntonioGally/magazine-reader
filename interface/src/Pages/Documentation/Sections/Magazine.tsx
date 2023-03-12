import React, { useMemo } from "react";
import { List, Tabs } from "antd";
//Images
import magazineInfo from "../../../static/Images/magazine-info.jpg";
import magazineSelector from "../../../static/Images/magazine-selector.jpg";

type listType = {
    title: string;
    description: string | JSX.Element;
}[]

const Magazine: React.FC = () => {
    const magazineInfoList: listType = [
        {
            title: "Titulo",
            description: "Texto que ficará na listagem de revistas, pode ter no máximo 256 caracteres."
        },
        {
            title: "Descrição",
            description: "Descrição da revista, pode ter no máximo 256 caracteres."
        },
        {
            title: "Imagem",
            description: "Imagem que ficará na listagem de revista. Esse campo recebe um link de uma imagem."
        },
        {
            title: "URL",
            description: "URL da página principal da revista."
        },
        {
            title: "Período de atualização",
            description: "Periodicidade de publicação de edições da revista. Este campo não é obrigatório."
        }
    ];

    const magazineSelectorInfo: listType = [
        {
            title: "Sitemap",
            description: "O site possui algum link de sitemap? Na dúvida, prefira seguir sem sitemap."
        },
        {
            title: "Link da listagem de edições",
            description: "Esse campo recebe um link que deve redirecionar para a listagem de edições. Uma página em que exista links para todas as edições."
        },
        {
            title: "Pesquisar por",
            description: (
                <span>
                    Aqui é necessário adicionar um padrão em que a plataforma consiga encontrar todos os links de edição.
                    por exemplo, se tenho essa lista links:
                    <ul>
                        <li>https://grecorromana.wordpress.com/numeros-anteriores/num-04/</li>
                        <li>https://grecorromana.wordpress.com/numero-actual/</li>
                        <li>https://grecorromana.wordpress.com/numeros-anteriores/num-03/</li>
                        <li>https://grecorromana.wordpress.com/</li>
                        <li>https://grecorromana.wordpress.com/numeros-anteriores/num-02/</li>
                        <li>https://grecorromana.wordpress.com/acerca-de/</li>
                        <li>https://grecorromana.wordpress.com/numeros-anteriores/num-01/</li>
                    </ul>
                    o meu <code>Pesquisar por</code> será <b>/numeros-anteriores/num-</b>, pois ele filtrará apenas os links de edição presentes nessa lista.
                </span>
            )
        }
    ]

    const infoComponent = (
        <div style={{ display: "flex" }}>
            <img src={magazineInfo} width={400} />
            <List
                size="small"
                style={{ width: "100%" }}
                bordered
                dataSource={magazineInfoList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    )

    const selectorComponent = (
        <div style={{ display: "flex" }}>
            <img src={magazineSelector} width={400} />
            <List
                size="small"
                style={{ width: "100%" }}
                bordered
                dataSource={magazineSelectorInfo}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    )

    const getTabs = useMemo(() => {
        return [
            {
                key: "1",
                label: "Informações",
                children: infoComponent
            },
            {
                key: "2",
                label: "Seletores",
                children: selectorComponent
            }
        ]
    }, [])
    return (
        <>
            <h1>Cadastrando uma nova revista</h1>
            <p>
                Hoje o cadastro é totalmente feito pela interface. Irei demonstrar um passo a passo e depois
                explicar de forma mais técnica como a plataforma consegue ler todas as edições.
            </p>
            <Tabs defaultActiveKey="1" items={getTabs} />
        </>
    )
}

export default Magazine;