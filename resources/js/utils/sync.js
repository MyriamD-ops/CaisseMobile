import db from '../db';
import axios from 'axios';

/**
 * Synchronise les produits depuis le serveur vers IndexedDB
 */
export async function syncProduits() {
    try {
        console.log('🔄 Synchronisation produits...');
        
        // Récupérer les produits depuis le serveur
        const response = await axios.get('/api/products');
        const produits = response.data;
        
        // Vider et remplir la table produits
        await db.produits.clear();
        await db.produits.bulkAdd(produits);
        
        console.log(`✅ ${produits.length} produits synchronisés`);
        return produits;
    } catch (error) {
        console.error('❌ Erreur sync produits:', error);
        throw error;
    }
}

/**
 * Récupère les produits depuis IndexedDB
 */
export async function getProduitsLocal() {
    try {
        const produits = await db.produits.toArray();
        console.log(`📦 ${produits.length} produits chargés depuis IndexedDB`);
        return produits;
    } catch (error) {
        console.error('❌ Erreur lecture IndexedDB:', error);
        return [];
    }
}

/**
 * Synchronise les événements depuis le serveur vers IndexedDB
 */
export async function syncEvenements() {
    try {
        console.log('🔄 Synchronisation événements...');
        
        const response = await axios.get('/api/events');
        const evenements = response.data;
        
        await db.evenements.clear();
        await db.evenements.bulkAdd(evenements);
        
        console.log(`✅ ${evenements.length} événements synchronisés`);
        return evenements;
    } catch (error) {
        console.error('❌ Erreur sync événements:', error);
        throw error;
    }
}

/**
 * Récupère les événements depuis IndexedDB
 */
export async function getEvenementsLocal() {
    try {
        const evenements = await db.evenements.toArray();
        console.log(`📦 ${evenements.length} événements chargés depuis IndexedDB`);
        return evenements;
    } catch (error) {
        console.error('❌ Erreur lecture IndexedDB:', error);
        return [];
    }
}
