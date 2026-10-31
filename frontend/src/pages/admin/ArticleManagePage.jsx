import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Edit3, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { articleService } from '../../services/articleService';
import ThreatBadge from '../../components/common/ThreatBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const ArticleManagePage = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // Deletion modal state
  const [deleteModal, setDeleteModal] = useState({ show: false, articleId: null, title: '' });

  const loadArticles = async (query, pageNum) => {
    setLoading(true);
    try {
      const res = await articleService.getAllArticlesForAdmin(query, pageNum, 10);
      if (res?.success && res.data) {
        setArticles(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (err) {
      console.error('Error fetching admin articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(searchTerm, page);
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    loadArticles(searchTerm, 0);
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await articleService.togglePublish(id, !currentStatus);
      loadArticles(searchTerm, page);
    } catch (err) {
      console.error('Error toggling publish status:', err);
    }
  };

  const handleDeleteClick = (article) => {
    setDeleteModal({ show: true, articleId: article.id, title: article.title });
  };

  const handleConfirmDelete = async () => {
    try {
      await articleService.deleteArticle(deleteModal.articleId);
      setDeleteModal({ show: false, articleId: null, title: '' });
      loadArticles(searchTerm, page);
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
              <FileText size={16} />
              <span>Educational Content CMS</span>
            </div>
            <h2 className="fw-bold text-dark mb-1">Article & Scam Alert Management</h2>
            <p className="text-secondary small mb-0">
              Create, curate, publish, and update community awareness articles and threat alerts.
            </p>
          </div>
          <Link to="/admin/articles/new" className="btn btn-danger rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm">
            <Plus size={18} />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="cyber-card p-3 mb-4 shadow-sm border bg-white">
        <form onSubmit={handleSearchSubmit} className="row g-2">
          <div className="col-md-10">
            <div className="input-group">
              <span className="input-group-text border-end-0 text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search articles by title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-dark w-100">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Articles Table */}
      {loading ? (
        <LoadingSpinner message="Loading articles catalog..." />
      ) : articles.length === 0 ? (
        <div className="cyber-card p-5 text-center shadow-sm border bg-white">
          <FileText size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Articles Found</h4>
          <p className="text-secondary small mb-4">No published or draft articles matched your search.</p>
          <Link to="/admin/articles/new" className="btn btn-danger rounded-pill px-4">
            Publish New Article
          </Link>
        </div>
      ) : (
        <div className="cyber-card p-4 shadow-sm border bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title & Summary</th>
                  <th>Category</th>
                  <th>Threat Level</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((art) => (
                  <tr key={art.id}>
                    <td style={{ maxWidth: '300px' }}>
                      <div className="fw-bold text-dark text-truncate">{art.title}</div>
                      <div className="text-muted small text-truncate">{art.summary}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill small">
                        {art.categoryName}
                      </span>
                    </td>
                    <td>
                      <ThreatBadge level={art.threatLevel} />
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm rounded-pill px-2.5 py-0.5 d-inline-flex align-items-center gap-1 ${
                          art.published ? 'btn-outline-success' : 'btn-outline-secondary'
                        }`}
                        onClick={() => handleTogglePublish(art.id, art.published)}
                      >
                        {art.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        <span>{art.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="small text-muted">{art.authorName}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-1">
                        <Link
                          to={`/admin/articles/${art.id}/edit`}
                          className="btn btn-outline-primary btn-sm rounded-circle p-1.5"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-circle p-1.5"
                          title="Delete"
                          onClick={() => handleDeleteClick(art)}
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

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={deleteModal.show}
        title="Delete Article"
        message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ show: false, articleId: null, title: '' })}
      />
    </div>
  );
};

export default ArticleManagePage;
