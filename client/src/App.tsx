import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ListeCategories from './components/ListeCategories';
import ShowCategorie from './components/ShowCategorie';
import AddCategorie from './components/AddCategorie';
import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<ListeCategories />} />
          <Route path="/add-categorie" element={<AddCategorie />} />
          <Route path="/categorie/:id" element={<ShowCategorie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
