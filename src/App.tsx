import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateProduit } from './components/CRUD_Produit/Create'
import { ReadProduit } from './components/CRUD_Produit/Read'
import { UpdateProduit } from './components/CRUD_Produit/Update'
import { Delete } from './components/CRUD_Produit/Delete'

function App() {


  return (
    <>

      <nav>
        <Link to="/create">Créer produit</Link>
        <Link to="/read">Afficher tous les produits</Link>
      </nav>
      <Routes>
        <Route path="create" element={<CreateProduit />} />
        <Route path="read" element={<ReadProduit />} />
        <Route path="update" element={<UpdateProduit />} />
        <Route path="delete" element={<Delete />} />
      </Routes>
    </>
  )
}

export default App
