export interface Produit {
    id: number;
    name: string;
    description: string;
    price: string;
    picture: string;
    stock: number;
    active: boolean;
    sous_rubrique: [string];
    fournisseur: string;
}