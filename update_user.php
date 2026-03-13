<?php
// Script temporaire - À SUPPRIMER après exécution
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Remplacer sophie par nathalie
$user = User::where('username', 'sophie')->first();
if ($user) {
    $user->username = 'nathalie';
    $user->pin_hash = Hash::make('2710');
    $user->save();
    echo "OK: sophie renommée en nathalie avec PIN 2710\n";
} else {
    // Si sophie n'existe pas, créer nathalie directement
    $existing = User::where('username', 'nathalie')->first();
    if ($existing) {
        $existing->pin_hash = Hash::make('2710');
        $existing->save();
        echo "OK: PIN de nathalie mis à jour (2710)\n";
    } else {
        User::create([
            'username' => 'nathalie',
            'pin_hash' => Hash::make('2710'),
            'role' => 'admin',
        ]);
        echo "OK: nathalie créée avec PIN 2710\n";
    }
}

// Afficher tous les users
echo "\nUtilisateurs en base :\n";
foreach (User::all(['username', 'role']) as $u) {
    echo "  - {$u->username} ({$u->role})\n";
}
