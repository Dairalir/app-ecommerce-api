import axios from "axios";
import { SetStateAction, useEffect, useState } from 'react';
import { Fournisseur } from "../../interfaces/Fournisseur";
import { SousRubrique } from "../../interfaces/Sous_rubrique";
import { useParams } from "react-router-dom";

export function UpdateProduit() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [picture, setPicture] = useState("")
    const [stock, setStock] = useState(0)
    const [active, setActive] = useState(false)
    const [fournisseur, setFournisseur] = useState("")
    const [sousRubrique, setSousRubrique] = useState<string[]>([])

    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([])
    useEffect(() => {
        axios.get(`https://damienvm.amorce.org/api/fournisseurs`)
            .then((r) => {
                setFournisseurs(r.data["hydra:member"])
            })
    }, [])
    const [sousRubriques, setSousRubriques] = useState<SousRubrique[]>([])
    useEffect(() => {
        axios.get(`https://damienvm.amorce.org/api/sous_rubriques`)
            .then((r) => {
                setSousRubriques(r.data["hydra:member"])
            })
    }, [])

    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://damienvm.amorce.org/api/produits/${id}`)
            .then((r) => {
                setName(r.data.name);
                setDescription(r.data.description);
                setPrice(r.data.price);
                setPicture(r.data.picture);
                setStock(r.data.stock);
                setActive(r.data.active);
                setFournisseur(r.data.fournisseur);
                setSousRubrique(r.data.sousRubrique)
            })
    }, [])

    const updateProduit = () => {
        axios.put(`https://damienvm.amorce.org/api/produits/${id}`, {
            name,
            description,
            price,
            picture,
            stock,
            active,
            fournisseur: fournisseur,
            sousRubrique: sousRubrique
        })
            .then(() => {
                alert('Your product was successfully updated!');
            })
            .catch((e) => {
                alert(`Product update failed! ${e.message}`);
            });
    }

    // useEffect(() = {
    //     updateProduit()
    // }, [])

    const handlePostSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        updateProduit();
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
    const handleChangeSousRubrique = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        console.log(event.target.value);
        if (sousRubrique.includes(event.target.value)) {
            setSousRubrique(sousRubrique.filter(e => e != event.target.value));
        } else {
            setSousRubrique([...sousRubrique, event.target.value]);
        }

    }

    return (
        <div>
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
                <label>Fournisseurs : </label>
                <select onChange={handleChangeFournisseur} value={fournisseur}>
                    <option >--Please choose an option--</option>
                    {
                        fournisseurs.map(fournisseur => (
                            <option key={fournisseur.id} value={`/api/fournisseurs/${fournisseur.id}`}>{fournisseur.name}</option>
                        ))
                    }
                </select>
                <label>Sous-Rubriques : </label>
                <select onChange={handleChangeSousRubrique} multiple value={sousRubrique}>
                    <option >--Please choose an option--</option>
                    {
                        sousRubriques.map(sousRubrique => (
                            <option key={sousRubrique.id} value={`/api/sous_rubriques/${sousRubrique.id}`}>{sousRubrique.name}</option>
                        ))
                    }
                </select>
                <button type='submit'>Confirmer</button>
            </form>
        </div>
    )
}
