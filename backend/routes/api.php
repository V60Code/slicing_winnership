<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes for API token-based authentication
require __DIR__.'/auth.php';


Route::middleware(['auth:sanctum'])->apiResource('tasks', App\Http\Controllers\TaskController::class);
