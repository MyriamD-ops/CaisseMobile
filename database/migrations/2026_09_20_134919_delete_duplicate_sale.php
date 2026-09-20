<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Vente;

return new class extends Migration
{
    public function up(): void
    {
        $vente = Vente::where('numero_vente', 'V-20260920-0002')->first();
        if ($vente) {
            $vente->lignes()->delete();
            $vente->delete();
        }
    }

    public function down(): void
    {
    }
};
