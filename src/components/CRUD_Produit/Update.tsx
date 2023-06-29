import axios from "axios";
import { SetStateAction, useEffect, useState } from 'react';
import { Produit } from "../../interfaces/Produit";

export function UpdateProduit() {

    const [produits, setProduits] = useState<Produit[]>([])

    useEffect(() => {
        axios.get(`https://damienvm.amorce.org/api/produits`)
            .then((r) => {
                setProduits(r.data["hydra:member"])
            })
    }, [])

    const updateProduit = () => {
        axios.patch(`https://damienvm.amorce.org/api/produits${id}`, {
            name,
            description,
            price,
            picture,
            stock,
            active,
            fournisseur: `api/fournisseurs/${fournisseur}`,
            sousRubrique: [`api/sous_rubriques/${sousRubrique}`]
        })
    }



    return (
        <div>

        </div>
    )
}