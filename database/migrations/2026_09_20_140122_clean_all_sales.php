<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Désactiver les contraintes de clés étrangères
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Supprimer toutes les ventes et leurs lignes
        DB::table('lignes_vente')->truncate();
        DB::table('ventes')->truncate();

        // Réactiver les contraintes
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

    public function down(): void
    {
        // Pas de rollback
    }
};
