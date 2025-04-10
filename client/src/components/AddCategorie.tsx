import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCategorieInterface } from '../config/type';



const AddCategorie = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AddCategorieInterface>({
    nom: '',
    description: '',
  });

  const getValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/addcategorie', data);
      setData({
        nom: '',
        description: '',
      });

      navigate('/categories');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="form-card">
        <h2 className="form-title">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Category Name
            </label>
            <input
              onChange={getValue}
              type="text"
              name="nom"
              id="name"
              className="form-control"
              placeholder="Enter category name"
              value={data.nom}
              required
              minLength={3}
            />
            <span className="form-error" id="name-error"></span>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              onChange={getValue}
              name="description"
              id="description"
              className="form-control min-h-[100px]"
              placeholder="Enter category description"
              value={data.description}
              required
              minLength={10}
            />
            <span className="form-error" id="description-error"></span>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategorie;
