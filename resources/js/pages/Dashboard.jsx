import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProduits: 0,
        stockBas: 0,
        ventesJour: 0,
        montantJour: 0,
    });

    useEffect(() => {
        // TODO: Fetch real data from API
        // Pour l'instant, données statiques
        setStats({
            totalProduits: 247,
            stockBas: 8,
            ventesJour: 23,
            montantJour: 1447,
        });
    }, []);

    const cards = [
        {
            title: 'PRODUITS',
            value: stats.totalProduits,
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'STOCK BAS',
            value: stats.stockBas,
