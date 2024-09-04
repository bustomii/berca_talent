<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $role_super_admin = Role::create(['name' => 'DEVELOPER']);
        $role_supervisor = Role::create(['name' => 'SUPERVISOR']);
        $role_cs = Role::create(['name' => 'CS']);

        $permission_read = Permission::create(['name' => 'read']);
        $permission_edit = Permission::create(['name' => 'edit']);
        $permission_write = Permission::create(['name' => 'write']);
        $permission_delete = Permission::create(['name' => 'delete']);

        $permissions_super_admin = [
            $permission_read,
            $permission_edit,
            $permission_write,
            $permission_delete,
        ];

        $permissions_supervisor = [
            $permission_read,
            $permission_edit,
            $permission_write,
        ];

        $permissions_cs = [
            $permission_read,
            $permission_write,
        ];

        $role_super_admin->syncPermissions($permissions_super_admin);
        $role_supervisor->syncPermissions($permissions_supervisor);
        $role_cs->syncPermissions($permissions_cs);

        $users = [
            [
                'name' => 'Bustomi',
                'email' => 'bustomi.xcvi@gmail.com',
                'password' => '12345678',
                'role' => [
                    'DEVELOPER',
                ],
            ],
        ];

        foreach($users as $user) {
            $created_user = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'created_at' => now(),
                'updated_at' => now(),
                'email_verified_at' => now(),
            ]);

            foreach($user['role'] as $role) {
                $created_user->assignRole($role);
            }

        }
    }
}
