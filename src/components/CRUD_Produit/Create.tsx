import { useEffect, useState } from 'react';

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

export function Create() {

    const [produits, setProduits] = useState<Produit[]>([])

    const postProduit = () => {
        fetch(`https://damienvm.amorce.org/api/produits`, {
            method: 'POST',
            headers : {
                "Accept": "application/json",
            },
        })
        .then(response => response.json())
        .then((json) => setProduits(json))
        .catch(error => console.error(error))
    }
    useEffect(() => {
        postProduit()
    },[]) 

    return (
        <form>
            <input type="text" />
            <button type='submit'></button>
        </form>
    )
}