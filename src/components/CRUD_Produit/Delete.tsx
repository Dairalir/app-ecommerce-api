import axios from "axios";



axios.delete(`https://damienvm.amorce.org/api/produits`)
    .then(() => {
        alert(`Deleted post with ID`);
    })
    .catch(error => {
        console.error(error);
    });