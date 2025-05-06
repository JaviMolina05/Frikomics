<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CartItemController;

Route::group([], function () {

    // 🔐 Autenticación
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    // 📚 Ver cómics (público)
    Route::get('/comics', [ComicController::class, 'index']);
    Route::get('/comics/{id}', [ComicController::class, 'show']);

    // 🛒 Carrito público (opcional)
    Route::get('/cart', [CartController::class, 'index']);

    // 🔐 Rutas protegidas por Sanctum
    Route::middleware(['auth:sanctum'])->group(function () {

        // 🔓 Logout
        Route::post('/logout', [AuthController::class, 'logout']);

        // 📚 Gestión de cómics
        Route::post('/comics', [ComicController::class, 'store']);
        Route::put('/comics/{id}', [ComicController::class, 'update']);
        Route::delete('/comics/{id}', [ComicController::class, 'destroy']);

        // 🛒 Carrito del usuario autenticado
        Route::get('/cart', [CartController::class, 'show']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{id}', [CartController::class, 'update']);
        Route::delete('/cart/{id}', [CartController::class, 'destroy']);
        Route::delete('/cart/clear', [CartController::class, 'clear']);

        // 🧺 Cart Items (necesario para tests)
        Route::post('/cart-items', [CartItemController::class, 'store']);
        Route::put('/cart-items/{id}', [CartItemController::class, 'update']);
        Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy']);

        // ❤️ Favoritos
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites', [FavoriteController::class, 'store']);
        Route::delete('/favorites/{comic}', [FavoriteController::class, 'destroy']);

        // 👤 Usuario (opcional)
        Route::get('/user', [UserController::class, 'show']);
        Route::post('/user', [UserController::class, 'store']);
    });
});
