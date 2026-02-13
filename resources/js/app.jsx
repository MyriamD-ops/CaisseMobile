import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginSimple from './pages/LoginSimple';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginSimple />} 
            />
            
            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<div className="text-2xl">Dashboard temporaire - en cours de développement</div>} />
                <Route path="products" element={<Products />} />
                <Route path="sales" element={<Sales />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;
