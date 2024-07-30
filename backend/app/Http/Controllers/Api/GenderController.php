<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use Illuminate\Http\Request;

class GenderController extends Controller
{
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
}
