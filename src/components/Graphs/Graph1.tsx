import { useState } from "react";
import { Chart } from "react-google-charts";

export function Graph1() {

    const [data, setData] = useState([
        ["Evénements", "Nombre"],
        ["Tertiaire", 11],
        ["Batiment", 3],
        ["Industrie", 7]
    ]);
    const [data1, setData1] = useState([
        ["Evénements", "Nombre"],
        ["Tertiaire", 11],
        ["Batiment", 3],
        ["Industrie", 7]
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