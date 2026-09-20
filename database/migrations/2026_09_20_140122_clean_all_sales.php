<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Supprimer toutes les ventes et leurs lignes pour une base clean
        DB::table('lignes_vente')->truncate();
        DB::table('ventes')->truncate();
    }

    public function down(): void
    {
        // Pas de rollback
    }
};
