import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { Fournisseur } from '../../interfaces/Fournisseur';


export function CreateProduit() {

    /*  const [values, setValues] = useState({
        name: '', description: '', price: '', picture: '', stock: 100, active: false, fournisseur: "api/fournisseurs/1", sousRubrique: ["api/sous_rubriques/8"]
    }); */

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [picture, setPicture] = useState("")
    const [stock, setStock] = useState(0)
    const [active, setActive] = useState(false)
    const [fournisseur, setFournisseur] = useState("")

    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([])

    useEffect(() => {
        axios.get(`https://damienvm.amorce.org/api/fournisseurs`)
            .then((r) => {
                setFournisseurs(r.data["hydra:member"])
            })
    }, [])

    const postProduit = () => {
        axios.post(`https://damienvm.amorce.org/api/produits`, {
            name,
            description,
            price,
            picture,
            stock,
            active,
            fournisseur: `api/fournisseurs/${fournisseur}`,
            sousRubrique: ["api/sous_rubriques/8"]
        })
            .then(() => {
                alert('Your product was successfully submitted!');
            })
            .catch((e) => {
                alert(`Registration failed! ${e.message}`);
            });
        setName('');
        setDescription('');
        setPrice('');
        setPicture('');
    }

    const handlePostSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        postProduit();
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
    const handleChangeStock = (evt: { target: { value: SetStateAction<string>; }; }) => {
        setStock(Number(evt.target.value));
    }
    const handleChangeActive = (evt: { target: { checked: boolean; }; }) => {
        setActive(evt.target.checked);
    }
    const handleChangeFournisseur = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setFournisseur(event.target.value);
    }

    return (
        <div>
            <h1>Ajouter Produit</h1>
            <form onSubmit={handlePostSubmit}>
                <label>Nom : </label>
                <input type="text" required value={name} onChange={handleChangeName} />
                <label>Description : </label>
                <input type='textarea' value={description} onChange={handleChangeDescription} />
                <label>Prix : </label>
                <input type="number" required value={price} onChange={handleChangePrice} />
                <label>Image : </label>
                <input type='text' value={picture} onChange={handleChangePicture} />
                <label>Stock : </label>
                <input type="number" value={stock} onChange={handleChangeStock} />
                <label>Actif : </label>
                <input type='checkbox' checked={active} onChange={handleChangeActive} />
                <select onChange={handleChangeFournisseur}>
                    <option value="">--Please choose an option--</option>
                    {
                        fournisseurs.map(fournisseur => (
                            <option key={fournisseur.id} value={fournisseur.id}>{fournisseur.name}</option>
                        ))
                    }
                </select>
                <button type='submit'>Confirmer</button>
            </form>
        </div>
    )
}