<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::where('username', 'admin')->update(['pin_hash' => Hash::make('3512')]);
echo "OK: PIN admin mis à jour (3512)\n";

foreach (User::all(['username', 'role']) as $u) {
    echo "  - {$u->username} ({$u->role})\n";
}
