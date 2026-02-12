<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Evenement extends Model
{
    protected $table = 'evenements';
    protected $primaryKey = 'id_evenement';

    protected $fillable = [
        'nom',
        'lieu',
        'date_debut',
        'date_fin',
        'description',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    public function ventes(): HasMany
    {
        return $this->hasMany(Vente::class, 'id_evenement', 'id_evenement');
    }
}
