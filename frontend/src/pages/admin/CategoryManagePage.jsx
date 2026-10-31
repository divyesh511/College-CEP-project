import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit2, Trash2, Check, AlertCircle } from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const CategoryManagePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', iconClass: 'bi-shield-check' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ show: false, catId: null, name: '' });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAllCategories();
      if (res?.success && res.data) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      iconClass: cat.iconClass || 'bi-shield-check',
    });
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', iconClass: 'bi-shield-check' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Category name is required.');
      return;
    }

    try {
      if (editingId) {
        await categoryService.updateCategory(editingId, formData);
        setSuccess('Category updated successfully!');
      } else {
        await categoryService.createCategory(formData);
        setSuccess('Category created successfully!');
      }
      handleCancelEdit();
      loadCategories();
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'Failed to save category.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await categoryService.deleteCategory(deleteModal.catId);
      setDeleteModal({ show: false, catId: null, name: '' });
      setSuccess('Category deleted successfully!');
      loadCategories();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete category (it may contain linked articles or quizzes).');
      setDeleteModal({ show: false, catId: null, name: '' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
          <Tag size={16} />
          <span>Curriculum Organization</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">Threat Category Management</h2>
        <p className="text-secondary small mb-0">
          Define syllabus categories that classify educational articles and interactive assessments.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
          <Check size={18} />
          <span>{success}</span>
        </div>
      )}

      <div className="row g-4">
        {/* Category Add/Edit Form */}
        <div className="col-lg-4">
          <div className="cyber-card p-4 shadow-sm border bg-white sticky-top" style={{ top: '80px' }}>
            <h5 className="fw-bold text-dark mb-3">
              {editingId ? 'Edit Category' : 'Create New Category'}
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Identity Theft & Impersonation"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Brief description of this threat topic."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-secondary">Bootstrap Icon Class</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="bi-shield-check"
                  value={formData.iconClass}
                  onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })}
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-danger flex-grow-1 rounded-pill fw-semibold">
                  {editingId ? 'Update' : 'Add Category'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Existing Categories Table */}
        <div className="col-lg-8">
          <div className="cyber-card p-4 shadow-sm border bg-white">
            <h5 className="fw-bold text-dark mb-3">Active Categories ({categories.length})</h5>

            {loading ? (
              <LoadingSpinner message="Loading categories..." />
            ) : categories.length === 0 ? (
              <div className="text-center py-4 text-muted small">No categories defined.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name & Description</th>
                      <th>Slug</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td>
                          <div className="fw-bold text-dark d-flex align-items-center gap-2">
                            <i className={`bi ${cat.iconClass || 'bi-shield-check'} text-info`}></i>
                            <span>{cat.name}</span>
                          </div>
                          <div className="small text-muted">{cat.description}</div>
                        </td>
                        <td>
                          <code className="text-secondary small">{cat.slug}</code>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-1">
                            <button
                              className="btn btn-outline-primary btn-sm rounded-circle p-1.5"
                              title="Edit"
                              onClick={() => handleEditClick(cat)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle p-1.5"
                              title="Delete"
                              onClick={() => setDeleteModal({ show: true, catId: cat.id, name: cat.name })}
                            >
                              <Trash2 size={16} />
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
        </div>
      </div>

      <ConfirmationModal
        show={deleteModal.show}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deleteModal.name}"? If articles or quizzes belong to this category, deletion may be blocked.`}
        confirmText="Delete Category"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ show: false, catId: null, name: '' })}
      />
    </div>
  );
};

export default CategoryManagePage;
