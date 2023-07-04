import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Produit } from "../../interfaces/Produit";

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
                alert(`Produit ${id} supprimé`);
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
                    <h3>{produit.name}</h3>
                    <b>Description :</b>
                    <p>{produit.description}</p>
                    <b>Quantité :</b>
                    <p>{produit.stock}</p>
                    <b>Prix :</b>
                    <p>{produit.price} €</p>
                    {produit.sous_rubrique.map((srub => (
                        <div key={srub.id}>
                            {srub.name}
                        </div>
                    )))}
                    <Link to={`/update/${produit.id}`}>Modifier</Link>
                    <button onClick={() => { produitDelete(produit.id) }}>Supprimer</button>
                </div>
            ))}
        </div>
    )
}

