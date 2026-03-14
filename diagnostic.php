<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Vente;
use Illuminate\Support\Facades\DB;

echo "=== DIAGNOSTIC SALES INDEX ===\n";

// Test 1 : connexion DB
try {
    $count = DB::table('ventes')->count();
    echo "OK: $count ventes en base\n";
} catch (\Exception $e) {
    echo "ERREUR DB: " . $e->getMessage() . "\n";
}

// Test 2 : requête avec relation
try {
    $sales = Vente::with('utilisateur')->latest('date_vente')->paginate(20);
    echo "OK: requête paginate réussie\n";
    echo "Nb ventes: " . $sales->count() . "\n";
    foreach ($sales as $s) {
        echo "  - Vente #{$s->id_vente} | {$s->moyen_paiement} | user: " . ($s->utilisateur ? $s->utilisateur->username : 'NULL') . "\n";
    }
} catch (\Exception $e) {
    echo "ERREUR requête: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}

// Test 3 : colonnes de la table
try {
    $cols = DB::getSchemaBuilder()->getColumnListing('ventes');
    echo "Colonnes ventes: " . implode(', ', $cols) . "\n";
} catch (\Exception $e) {
    echo "ERREUR colonnes: " . $e->getMessage() . "\n";
}
