<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subdistricts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained('districts');
            $table->string('name');
            $table->timestamps();
        });

        $data = [
            ['district_id' => 1, 'name' => 'Cengkareng'],
            ['district_id' => 1, 'name' => 'Grogol Petamburan'],
            ['district_id' => 1, 'name' => 'Kalideres'],
            ['district_id' => 1, 'name' => 'Kebon Jeruk'],
            ['district_id' => 1, 'name' => 'Kembangan'],
            ['district_id' => 2, 'name' => 'Cilandak'],
            ['district_id' => 2, 'name' => 'Jagakarsa'],
            ['district_id' => 2, 'name' => 'Kebayoran Baru'],
            ['district_id' => 2, 'name' => 'Kebayoran Lama'],
            ['district_id' => 2, 'name' => 'Mampang Prapatan'],
            ['district_id' => 2, 'name' => 'Pancoran'],
            ['district_id' => 2, 'name' => 'Pasar Minggu'],
            ['district_id' => 2, 'name' => 'Pesanggrahan'],
            ['district_id' => 2, 'name' => 'Setiabudi'],
        ];

        DB::table('subdistricts')->insert($data);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subdistricts');
    }
};
