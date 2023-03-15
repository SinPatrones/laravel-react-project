<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskTableSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 5; $i++) {
            $task = new Task();
            $task->name = $faker->paragraph;
            $task->completed = $faker->boolean();
            $task->save();
        }
    }
}
