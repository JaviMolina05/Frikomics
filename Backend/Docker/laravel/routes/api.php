<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['cors']], function () {

    // 🔐 Auth
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    // 📚 Ver cómics (público)
    Route::get('/comics', [ComicController::class, 'index']);
    Route::get('/comics/{id}', [ComicController::class, 'show']);

    // 🛒 Ver carrito sin login (opcional)
    Route::get('/cart', [CartController::class, 'index']);

    // 🔐 Rutas protegidas
    Route::middleware(['auth:sanctum'])->group(function () {

        // 🔓 Logout
        Route::post('/logout', [AuthController::class, 'logout']);

        // 📚 Gestión de cómics
        Route::post('/comics', [ComicController::class, 'store']);
        Route::put('/comics/{id}', [ComicController::class, 'update']);
        Route::delete('/comics/{id}', [ComicController::class, 'destroy']);

        // 🛒 Carrito
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{id}', [CartController::class, 'update']);
        Route::delete('/cart/{id}', [CartController::class, 'destroy']);
        Route::get('/cart/clear', [CartController::class, 'clear']);
        // Favoritos
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites', [FavoriteController::class, 'store']);
        Route::delete('/favorites/{comic}', [FavoriteController::class, 'destroy']);
        // 👤 Usuario (opcional)
        Route::get('/user', [UserController::class, 'show']);
        Route::post('/user', [UserController::class, 'store']);

    });
});
