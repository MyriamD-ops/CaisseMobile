<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HandleInertiaRequests
{
    public function handle(Request $request, $next)
    {
        Inertia::share('auth', function () use ($request) {
            return [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'username' => $request->user()->username,
                    'role' => $request->user()->role,
                ] : null,
            ];
        });

        return $next($request);
    }
}
