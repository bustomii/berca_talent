<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    
    public function province()
    {
        $data = DB::table('provinces')->get();

        return $data;
    }

    public function city($province)
    {
        $data = DB::table('cities')->where('province_id', $province)->get();

        return $data;
    }


    public function district($city)
    {
        $data = DB::table('districts')->where('city_id', $city)->get();

        return $data;
    }
}
