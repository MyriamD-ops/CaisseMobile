<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Produit extends Model
{
    protected $table = 'produits';
    protected $primaryKey = 'id_produit';

    protected $fillable = [
        'nom',
        'description',
        'categorie',
        'prix_base',
        'code_barres',
        'qr_code',
        'actif',
    ];

    protected $casts = [
        'prix_base' => 'decimal:2',
        'actif' => 'boolean',
    ];

    public function variantes(): HasMany
    {
        return $this->hasMany(Variante::class, 'id_produit', 'id_produit');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ImageProduit::class, 'id_produit', 'id_produit');
    }

    public function imagePrincipale()
    {
        return $this->hasOne(ImageProduit::class, 'id_produit', 'id_produit')
            ->where('est_principale', true);
    }

    public function mouvementsStock(): HasMany
    {
        return $this->hasMany(MouvementStock::class, 'id_produit', 'id_produit');
    }

    public function alertesStock(): HasMany
    {
        return $this->hasMany(AlerteStock::class, 'id_produit', 'id_produit');
    }

    // Calcul du stock total
    public function getStockTotalAttribute()
    {
        return $this->variantes->sum('stock_quantite');
    }
}
