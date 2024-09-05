<?php

namespace App\Http\Controllers\Office;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Office;

class OfficeController extends Controller
{
    public function index()
    {
        return inertia('Office/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
        ]);

        $office = Office::create($request->all());

        return response()->json(['message' => 'Created!']);
    }

    public function update(Request $request, Office $office)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
        ]);

        $office->update($request->all());

        return response()->json(['message' => 'Updated!']);
    }

    public function destroy(Office $office)
    {
        $office->delete();

        return response()->json(['message' => 'Deleted!']);
    }

    public function data(Request $request)
    {
        $offset = $request->offset;
        $search = $request->search;        
        $sorting = $request->sorting;
        if($sorting) {
            $dataSorting = explode(':', $sorting);
            $data = Office::orderBy($dataSorting[0], $dataSorting[1]);
        }else{
            $data = Office::orderBy('id', 'desc');
        }

        if ($search) {
            $data->where('name', 'like', '%' . $search . '%');
        }

        $data = $data->paginate(10, ['*'], 'offset', $offset)->onEachSide(0);
        return response()->json($data);
    }
}
