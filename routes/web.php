<?php

use Illuminate\Support\Facades\Route;
use Inertia\ResponseFactory;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\EvenementController;

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
    Route::get('/products/low-stock', [ProductController::class, 'lowStock'])->name('products.lowStock');
    Route::resource('products', ProductController::class);
    
    // Ventes
    Route::get('/sales/create', [SaleController::class, 'create'])->name('sales.create');
    Route::post('/sales', [SaleController::class, 'store'])->name('sales.store');
    Route::get('/sales', [SaleController::class, 'index'])->name('sales.index');
    Route::get('/sales/{sale}', [SaleController::class, 'show'])->name('sales.show');
    
    // Événements (Admin) - AVANT la route publique
    Route::get('/events', [EvenementController::class, 'index'])->name('events.index');
    Route::get('/events/create', [EvenementController::class, 'create'])->name('events.create');
    Route::post('/events', [EvenementController::class, 'store'])->name('events.store');
    Route::get('/events/{evenement}/edit', [EvenementController::class, 'edit'])->name('events.edit');
    Route::post('/events/{evenement}/update', [EvenementController::class, 'update'])->name('events.update');
    Route::post('/events/{evenement}/delete', [EvenementController::class, 'destroy'])->name('events.destroy');
    Route::get('/events/{evenement}/admin', [EvenementController::class, 'showAdmin'])->name('events.showAdmin');
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Page publique - Catalogue client événement (APRÈS les routes admin)
Route::get('/events/{code}', [EvenementController::class, 'show'])->name('events.public');
