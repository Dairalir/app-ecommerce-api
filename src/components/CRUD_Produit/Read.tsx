import axios from "axios";
import { useEffect, useState } from "react";


interface Produit {
    id: number;
    name: string;
    description: string;
    price: string;
    picture: string;
    stock: number;
    active: boolean;
    sous_rubrique: [string];
}

export function ReadProduit() {
    const [produits, setProduits] = useState<Produit[]>([])

    const produitData = () => {
        axios.get(`https://damienvm.amorce.org/api/produits`)
            .then((r) => {
                setProduits(r.data["hydra:member"])
            })
    }

    useEffect(() => {
        produitData()
    }, [])

    return (
        <div>
            <h1>Produits</h1>
            {produits.map(produit => (
                <div key={produit.id}>
                    <h3>{produit.name}</h3>
                    <b>Description :</b>
                    <p>{produit.description}</p>
                    <b>Quantité :</b>
                    <p>{produit.stock}</p>
                    <b>Prix :</b>
                    <p>{produit.price} €</p>
                </div>
            ))}
        </div>
    )
}

