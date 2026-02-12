import api from './api';

/**
 * Service d'authentification
 */
const authService = {
    /**
     * Connexion avec username et PIN
     */
    login: async (username, pin) => {
        try {
            const response = await api.post('/login', { username, pin });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Erreur de connexion' };
        }
    },

    /**
     * Déconnexion
     */
    logout: async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    },

    /**
     * Récupérer les informations de l'utilisateur connecté
     */
    me: async () => {
        try {
            const response = await api.get('/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Erreur lors de la récupération des données utilisateur' };
        }
    },
};

export default authService;
