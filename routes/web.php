<?php

use Illuminate\Support\Facades\Route;
use Inertia\ResponseFactory;

Route::get('/', function (ResponseFactory $inertia) {
    return $inertia->render('Welcome');
});
