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

        return redirect()->route('offices.index');
    }

    public function update(Request $request, Office $office)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
        ]);

        $office->update($request->all());

        return redirect()->route('offices.index');
    }

    public function destroy(Office $office)
    {
        $office->delete();

        return redirect()->route('offices.index');
    }
}
