<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('auctions', function (Blueprint $table) {
            $table->id();

            // Nuevos campos personalizados
            $table->string('title');
            $table->enum('condition', ['perfecto', 'buen estado', 'regular', 'muy usado']);
            $table->text('seller_note')->nullable();

            // Detalles de la subasta
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->decimal('starting_price', 10, 2); 
            $table->decimal('current_price', 10, 2)->nullable();
            $table->boolean('active')->default(true);
            $table->string('image')->nullable();

            // Relación con usuario ganador (opcional)
            $table->foreignId('winner_id')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auctions');
    }
};
