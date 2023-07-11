import axios from "axios";
import { useState } from "react";
import { Chart } from "react-google-charts";

export function Graph1() {


    const CAMois = () => {
        axios.get(`https://damienvm.amorce.org/api/commandes`)
            .then((r) => {
                setData(r.data["hydra:member"])
            })
    }

    const [data, setData] = useState([
        ["Mois", "CA"],
        ["Janvier", 11],
        ["Février", 3],
        ["Mars", 7],
        ["Avril", 7],
        ["Mai", 7],
        ["Juin", 7],
        ["Juillet", 7],
        ["Aout", 7],
        ["Septembre", 7],
        ["Octobre", 7],
        ["Novembre", 7],
        ["Décembre", 7],

    ]);
    const [data1, setData1] = useState([
        ["Fournisseur", "CA"],
        ["Fournisseur1", 11],
        ["Fournisseur2", 3],
        ["Fournisseur3", 7]
    ]);


    const option1 = {
        title: "CA mois par mois sur année",
        is3D: true
    };

    const option2 = {
        title: "CA par fournisseur",
        is3D: true
    };

    return (
        <>
            <Chart
                chartType="PieChart"
                data={data}
                options={option1}
                width={"100%"}
                height={"400px"}
            />
            <Chart
                chartType="PieChart"
                data={data1}
                options={option2}
                width={"100%"}
                height={"400px"}
            />
        </>
    )
}