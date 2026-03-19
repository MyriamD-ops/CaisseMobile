<?php
// Script de correction production — à exécuter une seule fois puis supprimer
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

echo "=== Correction base de données production ===\n";

// Vérifier les colonnes existantes
$columns = Schema::getColumnListing('ventes');
echo "Colonnes actuelles : " . implode(', ', $columns) . "\n";

// Si mode_paiement existe et moyen_paiement n'existe pas → renommer
if (in_array('mode_paiement', $columns) && !in_array('moyen_paiement', $columns)) {
    DB::statement('ALTER TABLE ventes RENAME COLUMN mode_paiement TO moyen_paiement');
    echo "✅ Colonne renommée : mode_paiement → moyen_paiement\n";
} elseif (in_array('moyen_paiement', $columns)) {
    echo "ℹ️  Colonne moyen_paiement déjà présente, rien à faire\n";
} else {
    echo "⚠️  Colonne mode_paiement introuvable\n";
}

// Vérifier le type de la colonne (doit être TEXT pour multi-paiement)
$colType = DB::select("SHOW COLUMNS FROM ventes LIKE 'moyen_paiement'");
if (!empty($colType)) {
    echo "Type actuel : " . $colType[0]->Type . "\n";
    if (strtolower($colType[0]->Type) === 'varchar(255)') {
        DB::statement('ALTER TABLE ventes MODIFY moyen_paiement TEXT');
        echo "✅ Type changé : varchar(255) → TEXT\n";
    } else {
        echo "ℹ️  Type déjà correct : " . $colType[0]->Type . "\n";
    }
}

// Afficher un aperçu des données
$sample = DB::select('SELECT id, moyen_paiement FROM ventes LIMIT 5');
echo "\nAperçu des données :\n";
foreach ($sample as $row) {
    echo "  ID {$row->id} → " . ($row->moyen_paiement ?: '(vide)') . "\n";
}

echo "\n=== Terminé ===\n";
