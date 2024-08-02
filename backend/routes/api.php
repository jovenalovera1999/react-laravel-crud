<?php

use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(GenderController::class)->group(function () {
    Route::get('/genders', 'index');
    Route::get('/gender/edit/{gender_id}', 'edit');
    Route::post('/gender/store', 'store');
});

Route::controller(UserController::class)->group(function () {
    Route::post('/user/store', 'store');
});
