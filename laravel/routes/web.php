<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Office\OfficeController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\RajaOngkir\RajaOngkirController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'access.pages'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users');
        Route::post('/', [UserController::class, 'store'])->name('users.store');
        Route::put('/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('/data', [UserController::class, 'data'])->name('users.data');
    });
    
    Route::prefix('offices')->group(function () {
        Route::get('/', [OfficeController::class, 'index'])->name('offices');
        Route::post('/', [OfficeController::class, 'store'])->name('offices.store');
        Route::put('/{office}', [OfficeController::class, 'update'])->name('offices.update');
        Route::delete('/{office}', [OfficeController::class, 'destroy'])->name('offices.destroy');
        Route::get('/data', [OfficeController::class, 'data'])->name('offices.data');
    });

    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('customers');
        Route::post('/', [CustomerController::class, 'store'])->name('customers.store');
        Route::put('/{customer}', [CustomerController::class, 'update'])->name('customers.update');
        Route::delete('/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
        Route::get('/data', [CustomerController::class, 'data'])->name('customers.data');
    });

    // rajaongkir
    Route::prefix('rajaongkir')->group(function () {
        Route::get('/province', [RajaOngkirController::class, 'province'])->name('rajaongkir.province');
        Route::get('/city/{province}', [RajaOngkirController::class, 'city'])->name('rajaongkir.city');
        Route::get('/district/{city}', [RajaOngkirController::class, 'district'])->name('rajaongkir.district');
    });
});

require __DIR__.'/auth.php';
