<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

echo "=== TOTAL VENTES: " . DB::table('ventes')->count() . " ===\n\n";

echo "=== VENTES (dernières 10) ===\n";
$ventes = DB::table('ventes')
    ->orderBy('date_vente', 'desc')
    ->limit(10)
    ->get();

if (count($ventes) === 0) {
    echo "❌ Aucune vente trouvée!\n";
} else {
    foreach ($ventes as $v) {
        echo "ID: {$v->id_vente} | Num: {$v->numero_vente} | Montant: {$v->montant_total}€ | Paiement: {$v->moyen_paiement}\n";
    }
}

echo "\n=== DOUBLONS POTENTIELS ===\n";
$doublons = DB::table('ventes')
    ->selectRaw('numero_vente, montant_total, date_vente, COUNT(*) as count')
    ->groupBy('numero_vente', 'montant_total', 'date_vente')
    ->having('count', '>', 1)
    ->get();

if (count($doublons) > 0) {
    echo "⚠️ Doublons trouvés:\n";
    foreach ($doublons as $d) {
        echo "  - {$d->numero_vente} | {$d->montant_total}€ | {$d->date_vente} (x{$d->count})\n";
    }
} else {
    echo "✅ Pas de doublons détectés\n";
}
