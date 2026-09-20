<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Vente;
use App\Models\LigneVente;

echo "=== SUPPRESSION DU DOUBLON ===\n\n";

// Trouver la vente avec le numéro V-20260920-0002
$vente = Vente::where('numero_vente', 'V-20260920-0002')->first();

if (!$vente) {
    echo "❌ Vente V-20260920-0002 introuvable!\n";
    exit(1);
}

echo "Vente trouvée: V-20260920-0002 (ID: {$vente->id_vente})\n";
echo "  Montant: {$vente->montant_total}€\n";
echo "  Date: {$vente->date_vente}\n";
echo "  Lignes de vente: " . $vente->lignes()->count() . "\n\n";

// Confirmation avant suppression
echo "⚠️ Cette action supprimera la vente ET ses lignes de détail.\n";
echo "Voulez-vous continuer? (yes/no): ";

$handle = fopen("php://stdin", "r");
$input = trim(fgets($handle));
fclose($handle);

if ($input !== 'yes') {
    echo "❌ Suppression annulée.\n";
    exit(0);
}

// Supprimer les lignes de vente d'abord
$lignesCount = $vente->lignes()->count();
$vente->lignes()->delete();

// Puis la vente
$vente->delete();

echo "\n✅ Suppression réussie!\n";
echo "   - Lignes supprimées: $lignesCount\n";
echo "   - Vente supprimée: 1\n";
