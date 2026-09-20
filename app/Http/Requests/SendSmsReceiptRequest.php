<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendSmsReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'telephone' => 'required|string|regex:/^(?:0[67]\d{8}|\+33[67]\d{8})$/',
        ];
    }

    public function messages(): array
    {
        return [
            'telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'telephone.string' => 'Le numéro doit être du texte.',
            'telephone.regex' => 'Le numéro doit être un numéro français valide (06 ou 07 ou +336/+337).',
        ];
    }
}
