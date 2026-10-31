import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Shield, Share2, AlertTriangle, PhoneCall } from 'lucide-react';
import { articleService } from '../../services/articleService';
import ThreatBadge from '../../components/common/ThreatBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ArticleDetailPage = () => {
  const { slug, id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        let res;
        if (slug) {
          res = await articleService.getArticleBySlug(slug);
        } else if (id) {
          res = await articleService.getArticleById(id);
        }
        if (res?.success && res.data) {
          setArticle(res.data);
        } else {
          setError('Article not found or unavailable');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Unable to load the requested article.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug, id]);

  if (loading) {
    return <LoadingSpinner message="Loading cyber awareness guide..." />;
  }

  if (error || !article) {
    return (
      <div className="container py-5 text-center">
        <div className="cyber-card p-5 max-w-600 mx-auto">
          <AlertTriangle size={48} className="text-warning mb-3" />
          <h4 className="fw-bold text-dark">Article Unavailable</h4>
          <p className="text-secondary small mb-4">{error || 'The requested article could not be located.'}</p>
          <Link to="/resources" className="btn btn-cyber-primary rounded-pill px-4">
            Browse All Articles
          </Link>
        </div>
      </div>
    );
  }

  // Format markdown paragraphs cleanly
  const renderContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="fw-bold text-heading mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('#### ')) {
        return <h4 key={index} className="fw-bold text-info mt-3 mb-2">{paragraph.replace('#### ', '')}</h4>;
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n- ');
        return (
          <ul key={index} className="text-secondary mb-3">
            {items.map((item, i) => (
              <li key={i} className="mb-1">{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={index} className="text-secondary leading-relaxed mb-3">{paragraph}</p>;
    });
  };

  return (
    <div className="py-5 bg-page min-vh-100">
      <div className="container">
        {/* Back link */}
        <div className="mb-4">
          <Link to="/resources" className="text-secondary text-decoration-none d-inline-flex align-items-center gap-1.5 small fw-semibold hover-info">
            <ArrowLeft size={16} />
            <span>Back to Resources Catalog</span>
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <article className="cyber-card p-4 p-md-5 shadow-lg">
              {/* Threat and Category Metadata */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-1.5 rounded-pill fw-bold">
                  {article.categoryName}
                </span>
                <ThreatBadge level={article.threatLevel} />
              </div>

              {/* Title */}
              <h1 className="display-6 fw-bold text-heading mb-3">
                {article.title}
              </h1>

              {/* Metadata Bar */}
              <div className="d-flex flex-wrap align-items-center gap-4 text-muted small pb-4 mb-4 border-bottom">
                <div className="d-flex align-items-center gap-1.5">
                  <User size={16} className="text-info" />
                  <span>Author: <strong>{article.authorName}</strong></span>
                </div>
                <div className="d-flex align-items-center gap-1.5">
                  <Calendar size={16} className="text-info" />
                  <span>Published: {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Recent'}</span>
                </div>
                <div className="d-flex align-items-center gap-1.5 ms-auto">
                  <Shield size={16} className="text-success" />
                  <span>Verified Educational Content</span>
                </div>
              </div>

              {/* Summary Lead */}
              <div className="cyber-card p-3.5 mb-4 rounded-4 text-secondary fst-italic">
                <strong>Executive Summary:</strong> {article.summary}
              </div>

              {/* Main Content Body */}
              <div className="article-body">
                {renderContent(article.content)}
              </div>

              {/* Helpdesk Callout */}
              <div className="p-4 mt-5 rounded-4 cyber-card border border-info border-opacity-30 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div>
                  <h6 className="fw-bold text-heading mb-1">Have you encountered a similar suspicious message?</h6>
                  <p className="text-secondary small mb-0">Ask our community moderators in the Cyber Safety Helpdesk.</p>
                </div>
                <Link to="/helpdesk/submit" className="btn btn-cyber-primary btn-sm px-4 rounded-pill flex-shrink-0">
                  Ask Helpdesk
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
