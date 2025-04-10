import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Category } from '../config/type';
import '../App.css';

const ListeCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormShowed, setIsFormShowed] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8000/api/liste_categories',
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:8000/api/categorie/${id}`);
        setCategories(categories.filter((cat) => cat.idCategorie !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsFormShowed(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await axios.put(
        `http://localhost:8000/api/edit-categorie/${editingCategory.idCategorie}`,
        {
          nom: editingCategory.nom,
          description: editingCategory.description,
        },
      );

      setCategories(
        categories.map((cat) =>
          cat.idCategorie === editingCategory.idCategorie
            ? editingCategory
            : cat,
        ),
      );
      setIsFormShowed(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Categories</h1>
        <Link to="/add-categorie" className="add-button">
          Add New Category
        </Link>
      </div>

      {isFormShowed && editingCategory && (
        <div className="edit-form-container">
          <h2>Edit Category</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="edit-name">Name</label>
              <input
                className="form-control"
                type="text"
                id="edit-name"
                value={editingCategory.nom}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    nom: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Description</label>
              <textarea
                className="form-control"
                id="edit-description"
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="view-button">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFormShowed(false);
                  setEditingCategory(null);
                }}
                className="delete-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="empty-message">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: Category) => (
                <tr key={category.idCategorie}>
                  <td>{category.idCategorie}</td>
                  <td>{category.nom}</td>
                  <td>{category.description}</td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/categorie/${category.idCategorie}`}
                        className="view-button"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.idCategorie)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListeCategories;
