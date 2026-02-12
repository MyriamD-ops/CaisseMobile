<?php

use Illuminate\Support\Facades\Route;

// Toutes les routes renvoient vers app.blade.php pour React Router
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
