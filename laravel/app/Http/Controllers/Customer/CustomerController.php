<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        return inertia('Customer/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'office_id' => 'required',
            'name' => 'required',
            'place_of_birth' => 'required',
            'date_of_birth' => 'required',
            'gender' => 'required',
            'occupation' => 'required',
            'address' => 'required',
            'deposit_nominal' => 'required',
            'status' => 'required',
        ]);

        $customer = Customer::create($request->all());

        return redirect()->route('customers.index');
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'office_id' => 'required',
            'name' => 'required',
            'place_of_birth' => 'required',
            'date_of_birth' => 'required',
            'gender' => 'required',
            'occupation' => 'required',
            'address' => 'required',
            'deposit_nominal' => 'required',
            'status' => 'required',
        ]);

        $customer->update($request->all());

        return redirect()->route('customers.index');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index');
    }


    // approve
    public function approve(Customer $customer)
    {
        $customer->update([
            'status' => 'Disetujui',
        ]);

        return redirect()->route('customers.index');
    }
            
}
