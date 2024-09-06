<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Address\AddressController;

Route::prefix('address')->group(function () {
    Route::get('/province', [AddressController::class, 'province'])->name('rajaongkir.province');
    Route::get('/city/{province}', [AddressController::class, 'city'])->name('rajaongkir.city');
    Route::get('/district/{city}', [AddressController::class, 'district'])->name('rajaongkir.district');
    Route::get('/subdistrict/{district}', [AddressController::class, 'subdistrict'])->name('rajaongkir.subdistrict');
});
