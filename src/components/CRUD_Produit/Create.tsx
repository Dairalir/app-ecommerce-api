import { SetStateAction, useEffect, useState } from 'react';

interface Produit {
    id: number;
    title: string;
    description: string;
    price: string;
    picture : string;
    stock: number;
    active : boolean;
    sous_rubrique: [string];
}

export function CreateProduit() {

    const [produits, setProduits] = useState<Produit[]>([])

    /*  const [values, setValues] = useState({
        name: '', description: '', price: '', picture: '', stock: 100, active: false, fournisseur: "api/fournisseurs/1", sousRubrique: ["api/sous_rubriques/8"]
    }); */

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [picture, setPicture] = useState("")
    const [stock, setStock] = useState(0)
    const [active, setActive] = useState(false)

    const postProduit = () => {
        fetch(`https://damienvm.amorce.org/api/produits`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                price,
                picture,
                stock : 150,
                active: false,
                fournisseur : "api/fournisseurs/1",
                sousRubrique: ["api/sous_rubriques/8"]
            }),
            headers : {
                "Content-Type": "application/json",
            },
        })
        setName('');
        setDescription('');
        setPrice('');
        setPicture('');
    }

    const handlePostSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try{
            postProduit();
            alert('Your product was successfully submitted!');
        }catch (e){
            alert(`Registration failed! ${console.error()}`)
        }
    }
    const handleChangeName = (evt: { target: { value: SetStateAction<string>; }; }) => {
        setName(evt.target.value);
    }
    const handleChangeDescription = (evt: { target: { value: SetStateAction<string>; }; }) => {
        setDescription(evt.target.value);
    }
    const handleChangePrice = (evt: { target: { value: SetStateAction<string>; }; }) => {
        setPrice(evt.target.value);
    }
    const handleChangePicture = (evt: { target: { value: SetStateAction<string>; }; }) => {
        setPicture(evt.target.value);
    }
    const handleChangeStock = (evt: { target: { value: SetStateAction<number>; }; }) => {
        setStock(evt.target.value);
    }
    const handleChangeActive = (evt: { target: { checked: boolean; }; }) => {
        setActive(evt.target.checked);
    }

    return (
        <div>
            <h1>Ajouter Produit</h1>
            <form onSubmit={handlePostSubmit}>
                <label>Nom : </label>
                <input type="text" required value={name} onChange={handleChangeName}/>
                <label>Description : </label>
                <input type='text-area' value={description} onChange={handleChangeDescription} />
                <label>Prix : </label>
                <input type="text" required value={price} onChange={handleChangePrice}/>
                <label>Image : </label>
                <input type='text' value={picture} onChange={handleChangePicture}/>
                {/* <label>Stock : </label>
                <input type="number" value={stock} onChange={handleChangeStock}/> */}
                {/* <label>Actif : </label>
                <input type='checkbox' checked={active} onChange={handleChangeActive}/>  */}
                <button type='submit'>Confirmer</button>
            </form>
        </div>
    )
}