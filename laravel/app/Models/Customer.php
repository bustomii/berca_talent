<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'office_id',
        'name',
        'place_of_birth',
        'date_of_birth',
        'gender',
        'occupation',
        'province_id',
        'city_id',
        'district_id',
        'address',
        'rt',
        'rw',
        'deposit_nominal',
        'status',
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }
}
