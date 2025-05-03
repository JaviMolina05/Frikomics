<?php
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::factory()->count(5)->create(); // Si tienes factories

        // O manual:
        User::create([
            'name' => 'javi',
            'email' => 'javi@frikomics.com',
            'password' => Hash::make('password'),
        ]);
    }
}

