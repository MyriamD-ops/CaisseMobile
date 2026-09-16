<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Produit;
use App\Models\Evenement;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with Nathalie's production data.
     */
    public function run(): void
    {
        // Utilisateur Nathalie (données réelles)
        $user = User::create([
            'username' => 'nathalie',
            'pin_hash' => '$2y$12$/BI80kcfIcYTbMyAUbksDOo8p8AhEudCf/Zjc5S0zTpNTriivqEjy',
            'role' => 'admin',
            'fingerprint_id' => null,
            'last_login' => '2026-04-20 20:04:40',
        ]);
        echo "✅ User: nathalie (admin)\n";

        // Produits (données réelles)
        Produit::create([
            'nom' => 'Produit test 1',
            'description' => null,
            'categorie' => 'Bijou',
            'matiere' => 'Résine',
            'prix_base' => 15.00,
            'stock_actuel' => 34,
            'stock_minimum' => 5,
            'code_barres' => 'PRD-69B2F0DFB9EF7',
            'qr_code' => null,
            'actif' => true,
        ]);

        Produit::create([
            'nom' => 'Produit test 2',
            'description' => null,
            'categorie' => 'Utilitaire',
            'matiere' => 'Résine',
            'prix_base' => 30.00,
            'stock_actuel' => 12,
            'stock_minimum' => 25,
            'code_barres' => 'PRD-69B736A0BDBC2',
            'qr_code' => null,
            'actif' => true,
        ]);
        echo "✅ Produits: 2 articles\n";

        // Événements (pour les ventes)
        Evenement::create([
            'nom' => 'Vente générale',
            'description' => 'Vente de produits',
            'date_debut' => '2026-03-12',
            'date_fin' => '2026-12-31',
            'lieu' => 'Boutique',
        ]);

        Evenement::create([
            'nom' => 'Événement spécial',
            'description' => 'Événement de démonstration',
            'date_debut' => '2026-04-01',
            'date_fin' => '2026-12-31',
            'lieu' => 'Boutique',
        ]);
        echo "✅ Événements: 2 créés\n";

        echo "\n📊 Base de démo prête pour le jury!\n";
        echo "   - 1 utilisateur (nathalie)\n";
        echo "   - 2 produits en stock\n";
        echo "   - 2 événements\n";
    }
}
