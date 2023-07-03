import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


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


    const produitDelete = (id: number) => {
        axios.delete(`https://damienvm.amorce.org/api/produits/${id}`)
            .then(() => {
                alert(`Produit ${id} supprimer`);
            })
            .catch(error => {
                console.error(error);
            });
    }


    useEffect(() => {
        produitData()
    }, [])

    return (
        <div>
            <h1>Produits</h1>
            {produits.map(produit => (
                <div key={produit.id}>
                    <h3>{produit.name}{produit.id}</h3>
                    <b>Description :</b>
                    <p>{produit.description}</p>
                    <b>Quantité :</b>
                    <p>{produit.stock}</p>
                    <b>Prix :</b>
                    <p>{produit.price} €</p>
                    <Link to={`/update/${produit.id}`}>Modifier</Link>
                    <button onClick={() => { produitDelete(produit.id) }}>Supprimer</button>
                </div>
            ))}
        </div>
    )
}

