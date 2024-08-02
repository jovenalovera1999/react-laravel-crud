<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'max:55'],
            'middle_name' => ['nullable', 'max:55'],
            'last_name' => ['required', 'max:55'],
            'age' => ['required', 'numeric'],
            'gender' => ['required'],
            'birth_date' => ['required', 'date'],
            'username' => ['required', 'max:55'],
            'password' => ['required', 'max:55']
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'age' => $validated['age'],
            'gender_id' => $validated['gender'],
            'birth_date' => $validated['birth_date'],
            'username' => $validated['username'],
            'password' => bcrypt($validated['password'])
        ]);

        return response()->json([
            'status' => 200
        ]);
    }
}
