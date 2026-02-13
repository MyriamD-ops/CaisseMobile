<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\ResponseFactory;

class ProductController extends Controller
{
    public function index(ResponseFactory $inertia)
    {
        $products = Produit::with('variantes', 'images')
            ->latest()
            ->get();

        return $inertia->render('Products/Index', [
            'products' => $products
        ]);
    }

    public function create(ResponseFactory $inertia)
    {
        return $inertia->render('Products/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock_actuel' => 'required|integer|min:0',
            'stock_minimum' => 'required|integer|min:0',
            'categorie' => 'required|string|max:100',
            'matiere' => 'nullable|string|max:100',
        ]);

        $validated['prix_base'] = $validated['prix'];
        unset($validated['prix']);
        $validated['code_barres'] = 'PRD-' . strtoupper(uniqid());
        $validated['actif'] = true;

        Produit::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Produit créé avec succès !');
    }

    public function edit(ResponseFactory $inertia, Produit $product)
    {
        $product->load('variantes', 'images');

        return $inertia->render('Products/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Produit $product)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock_actuel' => 'required|integer|min:0',
            'stock_minimum' => 'required|integer|min:0',
            'categorie' => 'required|string|max:100',
            'matiere' => 'nullable|string|max:100',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Produit modifié avec succès !');
    }

    public function destroy(Produit $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Produit supprimé avec succès !');
    }
}
