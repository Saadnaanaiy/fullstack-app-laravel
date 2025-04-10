import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Categorie {
  idCategorie: number;
  nom: string;
  description: string;
}

const ShowCategorie = () => {
  const [categorie, setCategorie] = useState<Categorie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Categorie>(
          `http://localhost:8000/api/categorie/${id}`,
        );
        setCategorie(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {categorie && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {categorie.nom}
          </h2>
          <p className="text-gray-600">{categorie.description}</p>
        </div>
      )}
    </div>
  );
};

export default ShowCategorie;
