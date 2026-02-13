<?php

use Illuminate\Support\Facades\Route;
use Inertia\ResponseFactory;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Page de login
Route::get('/login', function (ResponseFactory $inertia) {
    return $inertia->render('Login');
})->name('login')->middleware('guest');

// Traitement du login
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');

// Routes protégées
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/', function (ResponseFactory $inertia) {
        return $inertia->render('Dashboard');
    })->name('dashboard');
    
    // Produits
    Route::resource('products', ProductController::class);
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
