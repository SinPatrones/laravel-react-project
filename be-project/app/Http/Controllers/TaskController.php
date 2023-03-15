<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $filter = $request->query();
        if (sizeof($filter) > 0){
            $data = [];
            if ($filter['type'] === 'completed'){
                $data = Task::all()->where('completed', true)->values();
            } else {
                $data = Task::all()->where('completed', false)->values();
            }
            return response()->json([
                "success" => true,
                "message" => 'Filter applied',
                "data" => $data
            ], Response::HTTP_OK);
        }
        return response()->json([
            "success" => true,
            "message" => 'All task registered',
            "data" => Task::all()
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json([
                "success" => false,
                "message" => "Can't save the new task",
            ], Response::HTTP_BAD_REQUEST);
        }

        $newTask = new Task;
        $newTask->name = $request->name;
        $newTask->completed = false;

        $newTask->save();

        return response()->json([
            "success" => true,
            "message" => "New task added",
            "data" => $newTask
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id){
        $task = Task::find($id);

        if (is_null($task)){
            return response()->json([
                "success" => false,
                "message" => "Task not founded",
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            "success" => true,
            "message" => "New task added",
            "data" => $task
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task){
        $request->validate([
            'completed' => 'required'
        ]);

        $task->completed = $request->completed;
        $task->update();

        return response()->json([
            "success" => true,
            "message" => "Task updated",
            "data" => $task
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id){
        $task = Task::find($id);

        if (is_null($task)){
            return response()->json([
                "success" => false,
                "message" => "Can't delete id"
            ], Response::HTTP_NOT_FOUND);
        }

        $task->delete();

        return response()->noContent();
    }

}
