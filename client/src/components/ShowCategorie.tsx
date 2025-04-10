import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Categorie {
  idCategorie: number;
  nom: string;
  description: string;
}

const ShowCategorie = () => {
  const [categorie, setCategorie] = useState<Categorie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Categorie>(
          `http://localhost:8000/api/categorie/${id}`,
        );
        setCategorie(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div>
        <Link to="/categories">Back to Categories</Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : categorie ? (
        <div>
          <h2>{categorie.nom}</h2>
          <div>
            <small>Category ID: {categorie.idCategorie}</small>
          </div>
          <div>
            <h3>Description</h3>
            <p>{categorie.description}</p>
          </div>
        </div>
      ) : (
        <div>
          <p>Category not found</p>
        </div>
      )}
    </div>
  );
};

export default ShowCategorie;
