<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        \App\Models\Categorie::create([
            'nom' => 'Électronique',
            'description' => 'Produits électroniques et gadgets',
        ]);

         \App\Models\Categorie::create([
            'nom' => 'test',
            'description' => 'Produits test et gadgets',
        ]);

        \App\Models\Categorie::create([
            'nom' => 'Vêtements',
            'description' => 'Mode et accessoires',
        ]);

        \App\Models\Produit::create([
            'nom' => 'Smartphone',
            'qteStock' => 5,
            'prix' => 699.99,
            'idCategorie' => 1
        ]);

        \App\Models\Produit::create([
            'nom' => 'T-shirt',
            'qteStock' => 10,
            'prix' => 19.99,
            'idCategorie' => 2
        ]);
    }
}
