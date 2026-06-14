import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { ProductsPage } from './pages/ProductsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { SearchPage } from './pages/SearchPage';
import { FormPage } from './pages/FormPage';
import { DetailsPage } from './pages/DetailsPage';
import { TodosPage } from './pages/TodosPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/details" element={<DetailsPage />} />
      <Route path="/todos" element={<TodosPage />} />
    </Routes>
  );
};
