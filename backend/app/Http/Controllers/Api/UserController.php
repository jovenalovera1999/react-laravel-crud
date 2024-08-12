<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::leftJoin('tbl_genders', 'tbl_users.gender_id', '=', 'tbl_genders.gender_id')
            ->orderBy('tbl_users.last_name', 'asc')
            ->get();

        return response()->json([
            'status' => 200,
            'users' => $users
        ]);
    }

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

    public function edit($user_id)
    {
        $user = User::leftJoin('tbl_genders', 'tbl_users.gender_id', '=', 'tbl_users.gender_id')
            ->find($user_id);

        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }
}
