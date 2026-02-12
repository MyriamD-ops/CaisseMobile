import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <Routes>
            {/* Route publique de login */}
            <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
            />
            
            {/* Routes protégées */}
            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="sales" element={<Sales />} />
            </Route>

            {/* Redirection pour toutes les autres routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;
