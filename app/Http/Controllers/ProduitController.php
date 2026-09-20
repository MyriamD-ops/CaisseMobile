<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use Inertia\ResponseFactory;

class ProduitController extends Controller
{
    public function index(ResponseFactory $inertia)
    {
        $produits = Produit::with('variantes', 'images')
            ->orderBy('created_at', 'desc')
            ->get();

        return $inertia->render('Produits/Index', [
            'produits' => $produits,
        ]);
    }

    public function create(ResponseFactory $inertia)
    {
        return $inertia->render('Produits/Create');
    }

    public function store(StoreProduitRequest $request)
    {
        Produit::create($request->validated());

        return redirect()->route('produits.index')
            ->with('success', 'Produit créé avec succès !');
    }

    public function edit(ResponseFactory $inertia, Produit $produit)
    {
        return $inertia->render('Produits/Edit', [
            'produit' => $produit->load('variantes', 'images'),
        ]);
    }

    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        $produit->update($request->validated());

        return redirect()->route('produits.index')
            ->with('success', 'Produit modifié avec succès !');
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();

        return redirect()->route('produits.index')
            ->with('success', 'Produit supprimé avec succès !');
    }
}
