import { useEffect, useState } from "react";


interface Produit {
    id: number;
    name: string;
    description: string;
    price: string;
    picture : string;
    stock: number;
    active : boolean;
    sous_rubrique: [string];
}

export function ReadProduit(){
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
                    <b>Description :</b>
                    <p>{produit.description}</p>
                    <b>Quantité :</b>
                    <p>{produit.stock}</p>
                    <b>Prix :</b>
                    <p>{produit.price} €</p>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
            ))}
        </div>
    )
}

    