<?php

use Illuminate\Support\Facades\Route;
use Inertia\ResponseFactory;
use App\Http\Controllers\AuthController;

// Page de login
Route::get('/login', function (ResponseFactory $inertia) {
    return $inertia->render('Login');
})->name('login');

// Traitement du login
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', function (ResponseFactory $inertia) {
        return $inertia->render('Dashboard');
    })->name('dashboard');
    
    Route::post('/logout', [AuthController::class, 'logout']);
});
