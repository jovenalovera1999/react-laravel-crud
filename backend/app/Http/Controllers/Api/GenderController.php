<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use Illuminate\Http\Request;

class GenderController extends Controller
{
    public function index()
    {
        $genders = Gender::all();
        return response()->json([
            'status' => 200,
            'genders' => $genders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'gender' => ['required']
        ]);

        Gender::create([
            'gender' => $validated['gender']
        ]);

        return response()->json([
            'status' => 200
        ]);
    }

    public function edit($gender_id)
    {
        $gender = Gender::find($gender_id);
        return response()->json([
            'status' => 200,
            'gender' => $gender
        ]);
    }
}
