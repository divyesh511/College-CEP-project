import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FileText, Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { articleService } from '../../services/articleService';
import { categoryService } from '../../services/categoryService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ArticleFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    threatLevel: 'MEDIUM',
    summary: '',
    content: '',
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await categoryService.getAllCategories();
        if (catRes?.success && catRes.data) {
          setCategories(catRes.data);
          if (!isEdit && catRes.data.length > 0) {
            setFormData((prev) => ({ ...prev, categoryId: catRes.data[0].id }));
          }
        }

        if (isEdit) {
          const artRes = await articleService.getArticleById(id);
          if (artRes?.success && artRes.data) {
            const art = artRes.data;
            setFormData({
              title: art.title,
              categoryId: art.categoryId,
              threatLevel: art.threatLevel,
              summary: art.summary,
              content: art.content,
              published: art.published,
            });
          }
        }
      } catch (err) {
        console.error('Error preparing article form:', err);
        setError('Failed to load initial article or category data.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.summary.trim() || !formData.content.trim()) {
      setError('Title, Summary, and Content fields cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        categoryId: Number(formData.categoryId),
        threatLevel: formData.threatLevel,
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        published: formData.published,
      };

      let res;
      if (isEdit) {
        res = await articleService.updateArticle(id, payload);
      } else {
        res = await articleService.createArticle(payload);
      }

      if (res?.success) {
        navigate('/admin/articles');
      } else {
        setError(res?.message || 'Failed to save article.');
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'An error occurred while saving the article.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner message="Loading article details for editing..." />;
  }

  return (
    <div>
      <div className="mb-3">
        <Link to="/admin/articles" className="text-secondary text-decoration-none d-inline-flex align-items-center gap-1.5 small fw-semibold">
          <ArrowLeft size={16} />
          <span>Back to Articles List</span>
        </Link>
      </div>

      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
          <FileText size={16} />
          <span>Content Authoring</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">
          {isEdit ? 'Edit Educational Article' : 'Publish New Cyber Safety Guide'}
        </h2>
        <p className="text-secondary small mb-0">
          Format articles with markdown headings (###) and bullet points to provide clear community education.
        </p>
      </div>

      <div className="cyber-card p-4 p-md-5 shadow-sm border bg-white">
        {error && (
          <div className="alert alert-danger py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Article Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Recognizing Fake Buyer UPI QR Code Traps"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Threat Category</label>
              <select
                name="categoryId"
                className="form-select"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Threat Level</label>
              <select
                name="threatLevel"
                className="form-select"
                value={formData.threatLevel}
                onChange={handleChange}
                required
              >
                <option value="LOW">LOW RISK</option>
                <option value="MEDIUM">MEDIUM RISK</option>
                <option value="HIGH">HIGH RISK</option>
                <option value="CRITICAL">CRITICAL THREAT</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Executive Summary (Short Card Excerpt)</label>
            <textarea
              name="summary"
              className="form-control"
              rows="3"
              placeholder="A brief 1-2 sentence overview of the scam or safety principle."
              value={formData.summary}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Detailed Article Content (Markdown)</label>
            <textarea
              name="content"
              className="form-control font-monospace small"
              rows="12"
              placeholder="### Section Heading&#10;&#10;Detailed explanation of the attack vector.&#10;&#10;#### How to Protect Yourself:&#10;- Tip 1&#10;- Tip 2"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
            <div className="form-text small text-muted">
              Supports markdown headers (###), bullet points (- ), and bold text (**word**).
            </div>
          </div>

          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="publishedCheck"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            <label className="form-check-label small fw-semibold text-dark" htmlFor="publishedCheck">
              Publish immediately (make visible to public visitors)
            </label>
          </div>

          <div className="d-flex align-items-center justify-content-between pt-3 border-top">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => navigate('/admin/articles')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger rounded-pill px-4 d-inline-flex align-items-center gap-2 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <>
                  <Save size={16} />
                  <span>{isEdit ? 'Save Changes' : 'Publish Article'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormPage;
