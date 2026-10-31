import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';
import UserLayout from './components/layout/UserLayout';
import AdminLayout from './components/layout/AdminLayout';

// Route Guard
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutCepPage from './pages/public/AboutCepPage';
import ResourcesPage from './pages/public/ResourcesPage';
import ScamAwarenessPage from './pages/public/ScamAwarenessPage';
import SafetyTipsPage from './pages/public/SafetyTipsPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// User Portal Pages
import ArticleDetailPage from './pages/user/ArticleDetailPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import QuizListPage from './pages/user/QuizListPage';
import QuizPlayPage from './pages/user/QuizPlayPage';
import QuizHistoryPage from './pages/user/QuizHistoryPage';
import HelpdeskSubmitPage from './pages/user/HelpdeskSubmitPage';
import MyHelpdeskPage from './pages/user/MyHelpdeskPage';
import ProfilePage from './pages/user/ProfilePage';

// Admin Portal Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ArticleManagePage from './pages/admin/ArticleManagePage';
import ArticleFormPage from './pages/admin/ArticleFormPage';
import CategoryManagePage from './pages/admin/CategoryManagePage';
import QuizManagePage from './pages/admin/QuizManagePage';
import QuizFormPage from './pages/admin/QuizFormPage';
import UserManagePage from './pages/admin/UserManagePage';
import HelpdeskManagePage from './pages/admin/HelpdeskManagePage';

function App() {
  return (
    <Routes>
      {/* 1. Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-cep" element={<AboutCepPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/articles/id/:id" element={<ArticleDetailPage />} />
        <Route path="/scams" element={<ScamAwarenessPage />} />
        <Route path="/tips" element={<SafetyTipsPage />} />
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 2. User Protected Routes with UserLayout */}
      <Route
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/quizzes/history" element={<QuizHistoryPage />} />
        <Route path="/helpdesk/submit" element={<HelpdeskSubmitPage />} />
        <Route path="/helpdesk/my" element={<MyHelpdeskPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* 3. Quiz Play Screen (Stand-alone protected without sidebar for focus) */}
      <Route
        path="/quizzes/:id/play"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<QuizPlayPage />} />
      </Route>

      {/* 4. Admin Protected Routes with AdminLayout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="articles" element={<ArticleManagePage />} />
        <Route path="articles/new" element={<ArticleFormPage />} />
        <Route path="articles/:id/edit" element={<ArticleFormPage />} />
        <Route path="categories" element={<CategoryManagePage />} />
        <Route path="quizzes" element={<QuizManagePage />} />
        <Route path="quizzes/new" element={<QuizFormPage />} />
        <Route path="quizzes/:id/edit" element={<QuizFormPage />} />
        <Route path="users" element={<UserManagePage />} />
        <Route path="helpdesk" element={<HelpdeskManagePage />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
