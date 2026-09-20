<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'items' => 'required|array|min:1',
            'items.*.id_produit' => 'required|exists:produits,id_produit',
            'items.*.quantite' => 'required|integer|min:1',
            'items.*.prix_unitaire' => 'required|numeric|min:0',
            'moyen_paiement' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'items.required' => 'Au moins un article est obligatoire.',
            'items.min' => 'Vous devez ajouter au moins un article.',
            'items.*.id_produit.required' => 'L\'ID du produit est obligatoire.',
            'items.*.id_produit.exists' => 'Le produit sélectionné n\'existe pas.',
            'items.*.quantite.required' => 'La quantité est obligatoire.',
            'items.*.quantite.integer' => 'La quantité doit être un nombre entier.',
            'items.*.quantite.min' => 'La quantité doit être au minimum 1.',
            'items.*.prix_unitaire.required' => 'Le prix unitaire est obligatoire.',
            'items.*.prix_unitaire.numeric' => 'Le prix doit être un nombre.',
            'items.*.prix_unitaire.min' => 'Le prix doit être supérieur ou égal à 0.',
            'moyen_paiement.required' => 'Le moyen de paiement est obligatoire.',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Convertir moyen_paiement en array si c'est une chaîne
        if (is_string($this->moyen_paiement)) {
            $this->merge([
                'moyen_paiement' => [$this->moyen_paiement],
            ]);
        }
    }
}
