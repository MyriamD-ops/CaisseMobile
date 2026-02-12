<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ventes', function (Blueprint $table) {
            $table->id('id_vente');
            $table->string('numero_vente')->unique();
            $table->foreignId('id_utilisateur')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('id_evenement')->nullable()->constrained('evenements', 'id_evenement')->onDelete('set null');
            $table->decimal('montant_total', 10, 2);
            $table->enum('mode_paiement', ['especes', 'carte', 'mobile', 'autre'])->default('especes');
            $table->timestamp('date_vente');
            $table->boolean('synchronisee')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ventes');
    }
};
