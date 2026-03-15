<?php

namespace App\Http\Controllers;

use App\Models\Vente;
use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\ResponseFactory;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function create(ResponseFactory $inertia)
    {
        $products = Produit::where('actif', true)
            ->where('stock_actuel', '>', 0)
            ->get(['id_produit', 'nom', 'prix_base', 'stock_actuel', 'categorie']);

        return $inertia->render('Sales/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('=== DEBUT STORE VENTE ===');
        \Log::info('Request data:', $request->all());
        
        $request->validate([
            'items'              => 'required|array|min:1',
            'items.*.id_produit' => 'required|exists:produits,id_produit',
            'items.*.quantite'   => 'required|integer|min:1',
            'items.*.prix_unitaire' => 'required|numeric|min:0',
            'moyen_paiement'     => 'required',
        ]);

        $allowed = ['Espèces', 'Carte bancaire', 'Chèque', 'Virement'];
        $raw = $request->input('moyen_paiement');
        $moyens = is_array($raw) ? $raw : [$raw];
        foreach ($moyens as $m) {
            if (!in_array($m, $allowed)) {
                return back()->withErrors(['moyen_paiement' => "Moyen de paiement invalide : $m"]);
            }
        }

        $validated = $request->only(['items']);
        $validated['moyen_paiement'] = implode(', ', $moyens);
        
        \Log::info('Validation OK:', $validated);

        DB::beginTransaction();
        
        try {
            // Créer la vente
            $vente = Vente::create([
                'id_utilisateur' => auth()->id(),
                'montant_total' => collect($validated['items'])->sum(function ($item) {
                    return $item['quantite'] * $item['prix_unitaire'];
                }),
                'moyen_paiement' => $validated['moyen_paiement'],
                'statut' => 'Terminée',
                'date_vente' => now(),
            ]);
            
            \Log::info('Vente créée:', ['id' => $vente->id_vente]);

            // Créer les lignes de vente et mettre à jour le stock
            foreach ($validated['items'] as $item) {
                $sousTotal = $item['quantite'] * $item['prix_unitaire'];
                
                $vente->lignes()->create([
                    'id_produit' => $item['id_produit'],
                    'quantite' => $item['quantite'],
                    'prix_unitaire' => $item['prix_unitaire'],
                    'sous_total' => $sousTotal,
                    'remise' => 0,
                ]);

                // Décrémenter le stock
                $produit = Produit::find($item['id_produit']);
                $produit->decrement('stock_actuel', $item['quantite']);
                
                \Log::info('Stock mis à jour pour produit:', ['id' => $item['id_produit']]);
            }

            DB::commit();
            
            \Log::info('Transaction commit OK');

            return redirect()->route('sales.index')
                ->with('success', 'Vente enregistrée avec succès !');

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Erreur vente:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors([
                'error' => 'Erreur lors de l\'enregistrement de la vente : ' . $e->getMessage()
            ]);
        }
    }

    public function show(ResponseFactory $inertia, Vente $sale)
    {
        $sale->load(['lignes.produit', 'utilisateur']);

        return $inertia->render('Sales/Show', [
            'sale' => $sale
        ]);
    }

    public function index(ResponseFactory $inertia)
    {
        try {
            $sales = Vente::with('utilisateur')
                ->latest('date_vente')
                ->paginate(20);

            return $inertia->render('Sales/Index', [
                'sales' => $sales
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur sales.index: ' . $e->getMessage());
            return $inertia->render('Sales/Index', [
                'sales' => ['data' => [], 'links' => []]
            ]);
        }
    }
}
