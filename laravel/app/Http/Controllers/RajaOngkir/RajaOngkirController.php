<?php

namespace App\Http\Controllers\RajaOngkir;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RajaOngkirController extends Controller
{
    // https://api.rajaongkir.com/starter/province
    // province
    public function province()
    {
        // $curl = curl_init();

        // curl_setopt_array($curl, array(
        //     CURLOPT_URL => "https://api.rajaongkir.com/starter/province",
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => "",
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 0,
        //     CURLOPT_FOLLOWLOCATION => true,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => "GET",
        //     CURLOPT_HTTPHEADER => array(
        //         "key: 529a3248a230439da63b48f5d31eeccf----"
        //     ),
        // ));

        // $response = curl_exec($curl);

        // curl_close($curl);

        
        // if (json_decode($response)->rajaongkir->status->code != 200) {
            $response = json_encode([
                "rajaongkir" => [
                    "status" => [
                        "code" => 200,
                        "description" => "OK"
                    ],
                    "results" => [
                        [
                            "province_id" => "1",
                            "province" => "Bali"
                        ],
                    ]
                ]
            ]);

            return $response;
        // }

        // return $response;
    }

    // https://api.rajaongkir.com/starter/city
    // city
    public function city($province)
    {
        // $curl = curl_init();

        // curl_setopt_array($curl, array(
        //     CURLOPT_URL => "https://api.rajaongkir.com/starter/city",
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => "",
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 0,
        //     CURLOPT_FOLLOWLOCATION => true,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => "GET",
        //     CURLOPT_HTTPHEADER => array(
        //         "key: 529a3248a230439da63b48f5d31eeccf----"
        //     ),
        //     // parameter
        //     CURLOPT_POSTFIELDS => "province=" . $province
        // ));

        // $response = curl_exec($curl);

        // curl_close($curl);

        // if (json_decode($response)->rajaongkir->status->code != 200) {
            $response = json_encode([
                "rajaongkir" => [
                    "status" => [
                        "code" => 200,
                        "description" => "OK"
                    ],
                    "results" => [
                        [
                            "city_id" => "1",
                            "province_id" => "1",
                            "province" => "Bali",
                            "type" => "Kabupaten",
                            "city_name" => "Badung",
                            "postal_code" => "80361"
                        ],
                        [
                            "city_id" => "2",
                            "province_id" => "1",
                            "province" => "Bali",
                            "type" => "Kabupaten",
                            "city_name" => "Bangli",
                            "postal_code" => "80619"
                        ],
                    ]
                ]
            ]);

            return $response;
        // }

        // return $response;
    }

    // district
    public function district($city)
    {
        $response = json_encode([
            "rajaongkir" => [
                "status" => [
                    "code" => 200,
                    "description" => "OK"
                ],
                "results" => [
                    [
                        "subdistrict_id" => "1",
                        "province_id" => "1",
                        "province" => "Bali",
                        "city_id" => "1",
                        "city" => "Badung",
                        "subdistrict_name" => "Abiansemal"
                    ],
                    [
                        "subdistrict_id" => "2",
                        "province_id" => "1",
                        "province" => "Bali",
                        "city_id" => "2",
                        "city" => "Badung",
                        "subdistrict_name" => "Kuta"
                    ],

                ]
            ]
        ]);

        return $response;
    }
}
