import { useEffect, useState } from "react";


interface Produit {
    id: number;
    name: string;
    description: string;
    price: string;
    picture : string;
    stock: number;
    sous_rubrique: [string];
}

export function ShowProduit(){
    const [produits, setProduits] = useState<Produit[]>([])

    const produitData = () => {
        fetch(`https://damienvm.amorce.org/api/produits`, {
            headers : {
                "Accept": "application/json",
            },
        })
        .then(response => response.json())
        .then((json) => setProduits(json))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        produitData()
    },[])  

    return(
        <div>
            <h1>Produits</h1>
            <button>Ajouter Produit</button>
            {produits.map(produit =>(
                <div key={produit.id}>
                    <h3>{produit.name}</h3>
                    <p>{produit.description}</p>
                    <p>{produit.stock}</p>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
            ))}
        </div>
    )
}

    