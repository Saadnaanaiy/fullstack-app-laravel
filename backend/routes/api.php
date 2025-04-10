<?php

use App\Http\Controllers\CategorieController;
use Illuminate\Support\Facades\Route;

Route::get('/liste_categories', [CategorieController::class,'index'])->name('index');
Route::get('/categorie/{id}', [CategorieController::class,'show'])->name('show');
Route::delete('/categorie/{id}', [CategorieController::class,'delete'])->name('delete');
Route::post('/addcategorie', [CategorieController::class, 'store'])->name('store');
Route::put('/edit-categorie/{id}', [CategorieController::class, 'edit'])->name('edit');
