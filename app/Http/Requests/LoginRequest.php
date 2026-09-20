<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => 'required|string|max:255',
            'pin' => 'required|string|min:4|max:6',
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'Le nom d\'utilisateur est obligatoire.',
            'username.string' => 'Le nom d\'utilisateur doit être du texte.',
            'pin.required' => 'Le PIN est obligatoire.',
            'pin.min' => 'Le PIN doit faire au moins 4 chiffres.',
            'pin.max' => 'Le PIN ne doit pas dépasser 6 chiffres.',
        ];
    }
}
