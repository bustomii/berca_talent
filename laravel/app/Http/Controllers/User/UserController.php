<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Office;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return inertia('User/Index', [
            'offices' => Office::get(),
            'roles' => Role::get(),
        ]);
    }

    public function store(Request $request)
    {
    
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'office_id' => 'required',
            'password' => 'required',
            'is_locked' => 'required',
            'roles' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'office_id' => $request->office_id,
            'password' => Hash::make($request->password),
            'is_locked' => $request->is_locked,
        ]);

        $user->syncRoles($request->roles);

        return response()->json(['message' => 'Created!']);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'office_id' => 'required',
            'email' => 'required|email',
            'is_locked' => 'required',
            'roles' => 'required',
        ]);

        if($request->password) {
            $request->validate([
                'password' => 'required',
            ]);
            $request->merge(['password' => Hash::make($request->password)]);
        }else{
            $user->update($request->all());
        }

        $user->roles()->detach();
        $user->syncRoles($request->roles);

        return response()->json(['message' => 'Updated!']);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Deleted!']);
    }

    // user active
    public function active(User $user)
    {
        $user->update(['is_locked' => false]);

        return response()->json(['message' => 'User is active!']);
    }

    // data
    public function data(Request $request)
    {
        $offset = $request->offset;
        $search = $request->search;        
        $sorting = $request->sorting;
        if($sorting) {
            $dataSorting = explode(':', $sorting);
            $data = User::orderBy($dataSorting[0], $dataSorting[1]);
        }else{
            $data = User::orderBy('id', 'desc');
        }

        if ($search) {
            $data->where('name', 'like', '%' . $search . '%');
        }

        $data = $data->paginate(10, ['*'], 'offset', $offset)->onEachSide(0);
        return response()->json($data);
    }
}
