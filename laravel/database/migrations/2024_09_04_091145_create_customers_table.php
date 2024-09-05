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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('office_id')->constrained('offices');
            $table->string('name');
            $table->string('place_of_birth');
            $table->date('date_of_birth');
            $table->enum('gender', ['Laki-laki', 'Perempuan']);
            $table->string('occupation');
            $table->integer('province_id');
            $table->integer('city_id');
            $table->integer('district_id');
            $table->string('address');
            $table->string('rt');
            $table->string('rw');
            $table->decimal('deposit_nominal', 10, 2);
            $table->enum('status', ['Menunggu Approval', 'Disetujui']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
