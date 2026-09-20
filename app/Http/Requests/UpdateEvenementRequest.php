<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEvenementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'lieu' => 'nullable|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'description' => 'nullable|string',
            'statut' => 'required|in:planifie,en_cours,termine',
            'produits' => 'nullable|array',
            'produits.*.id' => 'required|exists:produits,id_produit',
            'produits.*.stock' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de l\'événement est obligatoire.',
            'nom.max' => 'Le nom ne doit pas dépasser 255 caractères.',
            'date_debut.required' => 'La date de début est obligatoire.',
            'date_debut.date' => 'La date de début doit être une date valide.',
            'date_fin.required' => 'La date de fin est obligatoire.',
            'date_fin.date' => 'La date de fin doit être une date valide.',
            'date_fin.after_or_equal' => 'La date de fin doit être après ou égale à la date de début.',
            'statut.required' => 'Le statut est obligatoire.',
            'statut.in' => 'Le statut doit être planifié, en cours ou terminé.',
            'produits.*.id.required' => 'L\'ID du produit est obligatoire.',
            'produits.*.id.exists' => 'Le produit sélectionné n\'existe pas.',
            'produits.*.stock.required' => 'Le stock de l\'événement est obligatoire.',
            'produits.*.stock.integer' => 'Le stock doit être un nombre entier.',
            'produits.*.stock.min' => 'Le stock doit être supérieur ou égal à 0.',
        ];
    }
}
