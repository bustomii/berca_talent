<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use App\Models\Office;
use Illuminate\Support\Facades\Mail;

class CustomerController extends Controller
{
    public function index()
    {
        return inertia('Customer/Index', [
            'cs' => Auth::user()->hasRole('CS') ? true : false,
            'supervisor' => Auth::user()->hasRole('SUPERVISOR') ? true : false,
            'developer' => Auth::user()->hasRole('DEVELOPER') ? true : false,
            'offices' => Office::get(),
        ]);
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
        ]);

        $request->merge(['status' => 'Menunggu Approval']);
        $customer = Customer::create($request->all());

        return response()->json(['message' => 'Created!']);
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

        if($request->status == 'Disetujui') {
            $data = [
                'nominal' => $customer->deposit_nominal,
                'name' => $customer->name,
                'status' => $customer->status,
            ];
            
            Mail::mailer('smtp')->to('bustomi.xcvi@gmail.com')->send(new MailSupervisor($data));
        }

        return response()->json(['message' => 'Updated!']);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json(['message' => 'Deleted!']);
    }


    // approve
    public function approve(Customer $customer)
    {
        $customer->update([
            'status' => 'Disetujui',
        ]);

        return response()->json(['message' => 'Disetujui!']);
    }
    
    // data
    public function data(Request $request)
    {
        $offset = $request->offset;
        $search = $request->search;        
        $sorting = $request->sorting;
        if($sorting) {
            $dataSorting = explode(':', $sorting);
            $data = Customer::orderBy($dataSorting[0], $dataSorting[1]);
        }else{
            $data = Customer::orderBy('id', 'desc');
        }

        if ($search) {
            $data->where('name', 'like', '%' . $search . '%');
        }

        $data = $data->paginate(10, ['*'], 'offset', $offset)->onEachSide(0);
        return response()->json($data);
    }
}
