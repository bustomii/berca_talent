<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AccessPages
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->path();
        $user = Auth::user();
        if($user->hasRole('DEVELOPER')) {
            return $next($request);
        }

        $explodePath = explode('/', $path);
        if(!str_contains($path, 'users') && !str_contains($path, 'offices')) {
            return $next($request);
        }

        return response()->view('errors/403');
    }
}
