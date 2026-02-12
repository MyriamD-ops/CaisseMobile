<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Produit;
use App\Models\Variante;
use App\Models\Evenement;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un utilisateur admin
        $admin = User::create([
            'username' => 'admin',
            'name' => 'Sophie Martin',
            'email' => 'admin@atelierdore.fr',
            'password' => Hash::make('password'),
            'pin_hash' => Hash::make('1234'),
            'role' => 'admin',
        ]);

        // Créer des événements
        $evenements = [
            [
                'nom' => 'Marché de Noël 2026',
                'lieu' => 'Fort-de-France',
                'date_debut' => '2026-12-15',
                'date_fin' => '2026-12-24',
                'description' => 'Marché de Noël annuel',
            ],
            [
                'nom' => 'Salon des Artisans',
                'lieu' => 'Trois-Îlets',
                'date_debut' => '2026-03-10',
                'date_fin' => '2026-03-12',
                'description' => 'Salon artisanat local',
            ],
        ];

        foreach ($evenements as $evenement) {
            Evenement::create($evenement);
        }

        // Créer des produits avec variantes
        $produits = [
            [
                'nom' => 'Perles Dorées Océane',
                'description' => 'Magnifique collier composé de perles dorées et de coquillages',
                'categorie' => 'Colliers',
                'prix_base' => 89.00,
                'code_barres' => 'PDO001',
                'qr_code' => 'QR-PDO001',
                'actif' => true,
            ],
            [
                'nom' => 'Cristal Étoile',
                'description' => 'Boucles d\'oreilles en cristal étoilé',
                'categorie' => 'Boucles d\'oreilles',
                'prix_base' => 45.00,
                'code_barres' => 'CE002',
                'qr_code' => 'QR-CE002',
                'actif' => true,
            ],
            [
                'nom' => 'Bracelet Argent Tressé',
                'description' => 'Bracelet en argent fait main avec motif tressé',
                'categorie' => 'Bracelets',
                'prix_base' => 67.50,
                'code_barres' => 'BAT003',
                'qr_code' => 'QR-BAT003',
                'actif' => true,
            ],
            [
                'nom' => 'Bague Cristal Océane',
                'description' => 'Bague en argent avec cristal bleu',
                'categorie' => 'Bagues',
                'prix_base' => 52.00,
                'code_barres' => 'BCO004',
                'qr_code' => 'QR-BCO004',
                'actif' => true,
            ],
        ];

        foreach ($produits as $produitData) {
            $produit = Produit::create($produitData);

            // Créer des variantes pour chaque produit
            if ($produit->categorie === 'Bracelets') {
                Variante::create([
                    'id_produit' => $produit->id_produit,
                    'taille' => 'S',
                    'stock_quantite' => 5,
                    'sku' => $produit->code_barres . '-S',
                ]);
                Variante::create([
                    'id_produit' => $produit->id_produit,
                    'taille' => 'M',
                    'stock_quantite' => 8,
                    'sku' => $produit->code_barres . '-M',
                ]);
                Variante::create([
                    'id_produit' => $produit->id_produit,
                    'taille' => 'L',
                    'stock_quantite' => 3,
                    'sku' => $produit->code_barres . '-L',
                ]);
            } elseif ($produit->categorie === 'Boucles d\'oreilles') {
                Variante::create([
                    'id_produit' => $produit->id_produit,
                    'couleur' => 'Argent',
                    'stock_quantite' => 12,
                    'sku' => $produit->code_barres . '-ARG',
                ]);
                Variante::create([
                    'id_produit' => $produit->id_produit,
                    'couleur' => 'Or',
                    'ajustement_prix' => 10.00,
                    'stock_quantite' => 6,
                    'sku' => $produit->code_barres . '-OR',
                ]);
            } else {
                // Variante par défaut
                Variante::create([
                    'id_produit' => $produit->id_produit,
                    'stock_quantite' => 10,
                    'sku' => $produit->code_barres . '-STD',
                ]);
            }
        }
    }
}
