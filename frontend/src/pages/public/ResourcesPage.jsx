import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, Tag, RefreshCw } from 'lucide-react';
import { articleService } from '../../services/articleService';
import { categoryService } from '../../services/categoryService';
import ThreatBadge from '../../components/common/ThreatBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';

const ResourcesPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await categoryService.getAllCategories();
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Load articles
  const loadArticles = async (catId, query, pageNum) => {
    setLoading(true);
    try {
      const res = await articleService.getPublishedArticles(catId || null, query, pageNum, 9);
      if (res.success && res.data) {
        setArticles(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(selectedCategory, searchTerm, page);
  }, [selectedCategory, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    loadArticles(selectedCategory, searchTerm, 0);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setPage(0);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setPage(0);
    loadArticles('', '', 0);
  };

  return (
    <div className="py-5 bg-page min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="text-info fw-bold small text-uppercase">Community Knowledge Base</span>
          <h1 className="display-5 fw-extrabold text-dark mt-1">Cyber Safety Resources & Guides</h1>
          <p className="text-secondary">
            Browse verified educational articles, scam mitigation procedures, and cybersecurity hygiene guides.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="cyber-card p-3 p-md-4 mb-5 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
            <div className="col-lg-6">
              <div className="input-group">
                <span className="input-group-text border-end-0 text-muted">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search articles by title, keyword, or scam tactic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-cyber-primary px-4">
                  Search
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-md-8">
              <div className="input-group">
                <span className="input-group-text border-end-0 text-muted">
                  <Filter size={18} />
                </span>
                <select
                  className="form-select border-start-0"
                  value={selectedCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                >
                  <option value="">All Categories ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 text-end">
              <button
                type="button"
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-1.5 rounded-pill"
                onClick={handleReset}
              >
                <RefreshCw size={16} />
                <span>Reset</span>
              </button>
            </div>
          </form>

          {/* Category Quick Tags */}
          <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
            <span className="small text-muted align-self-center me-1">Topics:</span>
            <button
              className={`badge border px-3 py-1.5 rounded-pill text-decoration-none ${
                selectedCategory === '' ? 'btn-cyber-primary text-white border-0' : 'bg-secondary bg-opacity-20 text-secondary border-secondary border-opacity-30'
              }`}
              onClick={() => handleCategorySelect('')}
            >
              All Topics
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`badge border px-3 py-1.5 rounded-pill text-decoration-none ${
                  selectedCategory === String(c.id) ? 'btn-cyber-primary text-white border-0' : 'bg-secondary bg-opacity-20 text-secondary border-secondary border-opacity-30'
                }`}
                onClick={() => handleCategorySelect(String(c.id))}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <LoadingSpinner message="Fetching educational cyber safety guides..." />
        ) : articles.length === 0 ? (
          <div className="text-center py-5 cyber-card p-5">
            <BookOpen size={48} className="text-muted mb-3" />
            <h5 className="fw-bold text-dark">No Articles Found</h5>
            <p className="text-secondary small max-w-500 mx-auto mb-4">
              We couldn't find any articles matching your search criteria. Try adjusting your keywords or clearing the category filter.
            </p>
            <button className="btn btn-cyber-primary" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {articles.map((article) => (
                <div key={article.id} className="col-lg-4 col-md-6">
                  <div className="cyber-card p-4 h-100 d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary border-opacity-25 px-2.5 py-1 rounded-pill small">
                        {article.categoryName}
                      </span>
                      <ThreatBadge level={article.threatLevel} />
                    </div>

                    <h5 className="fw-bold mb-2 text-heading line-clamp-2">
                      <Link to={`/articles/${article.slug}`} className="text-heading text-decoration-none hover-info">
                        {article.title}
                      </Link>
                    </h5>

                    <p className="text-secondary small flex-grow-1 line-clamp-3 mb-4">
                      {article.summary}
                    </p>

                    <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto small text-muted">
                      <span>By {article.authorName}</span>
                      <Link
                        to={`/articles/${article.slug}`}
                        className="text-info fw-bold text-decoration-none d-flex align-items-center gap-1"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
