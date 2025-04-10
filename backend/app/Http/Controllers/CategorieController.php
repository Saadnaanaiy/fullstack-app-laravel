<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index() {
        $categories = Categorie::all();
        return response()->json($categories, 200);
    }

    public function show(string $id) {
        $categorie = Categorie::findOrFail($id);
        return response()->json($categorie,200);
    }

    public function delete(string $id) {
        $categorie = Categorie::destroy($id);
        if ($categorie>0) {
            return response()->json("Le categorie id=$id est bien supprimé",200);
        }else{
            return response()->json("Le categorie id=$id n'est bien supprimé",400);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "nom"=> "required|string|max:255",
            "description"=> "required|string|max:255",
        ]);
        Categorie::create($validatedData);
        return response()->json("La Categorie est bien ajoutée",201);
    }

    public function edit(string $id, Request $request) {
        $categorie = Categorie::findOrFail($id);
        $validatedData = $request->validate([
            "nom" => "required|string|max:255",
            "description" => "required|string|max:255",
        ]);

        $categorie->update($validatedData);
        return response()->json("La Categorie est bien modifiée", 200);
    }
}
