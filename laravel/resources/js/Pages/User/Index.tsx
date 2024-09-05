import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ColumnsDataTable, DataUsers, PageProps, Paginate, Role } from '@/types';
import DataTables from '@/Components/Datatable';
import { useEffect, useState } from 'react';
import { HEADER_DEFAULT } from '@/Constants';
import Modal from '@/Components/Modal';
import axios from 'axios';

export default function UsersComponent({ auth, offices, roles }: PageProps) {
    const columns: ColumnsDataTable[] = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
            width: "50px"
        },
        {
            name: 'Office Name',
            selector: 'office_name',
            sortable: false,
            width: "200px"
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            width: "200px"
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            width: "200px"
        },
        {
            name: 'Roles',
            selector: 'roles',
            sortable: true,
            width: "200px"
        },
        {
            name: 'Is Locked',
            selector: 'is_locked',
            sortable: true,
            width: "200px"
        }, {
            name: 'Action',
            selector: 'action',
            sortable: false,
            width: "200px"
        }
    ];

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalConfirm, setModalConfirm] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [sorting, setSorting] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paginate, setPaginate] = useState<Paginate[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [errors, setErrors] = useState<any>(null);
    const [formState, setFormState] = useState<DataUsers>({} as DataUsers)

    const GetPaginateData = async (paginate: Paginate) => {
        GetData(paginate.url).then((data) => {
            setupData(data.data);
            setPaginate(data.links);
        });
    }


    const GetData = async (url: string) => {
        setIsLoading(true);
        const response = await fetch(url, {
            method: 'GET',
            headers: HEADER_DEFAULT,
        });

        return response.json();
    }

    const OpenEditModal = (data: DataUsers) => {
        setOpenModal(true);
        setFormState(data);
    }

    const setupData = (data: any[]) => {
        const newData = data.length > 0 ? data.map((item: any, index) => {
            return {
                ...item,
                roles: <div className="flex gap-1 justify-center w-full">{item.roles.map((role: any) => role.name).join(', ')}</div>,
                is_locked: <div className="flex gap-1 justify-center w-full"> {item.is_locked ? 'Yes' : 'No'}</div>,
                office_name: <div className="flex gap-1 justify-center w-full">{item.office ? item.office.name : '-'}</div>,
                action: <div className="flex gap-1 justify-center w-full">
                    <button className="bg-black bg-opacity-80 py-1 px-2 rounded text-white text-xs font-semibold"
                        onClick={() => {
                            OpenEditModal(item)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button className="bg-black bg-opacity-80 py-1 px-2 rounded text-white text-xs font-semibold"
                        onClick={() => {
                            setFormState(item)
                            setModalConfirm(true)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>,
            }
        }) : [];

        setData(newData);
        setIsLoading(false);
    }

    useEffect(() => {
        GetData(`/users/data?search=${search}&sorting=${sorting}&offset=0`).then((data) => {
            setupData(data.data);
            setPaginate(data.links);
        });
    }, [search, sorting]);

    const OpenAddModal = () => {
        setOpenModal(true);
        setFormState({} as DataUsers);
        setErrors(null);
    }

    const CloseModal = () => {
        setOpenModal(false);
        setModalConfirm(false);
        setErrors(null);
        setFormState({} as DataUsers);
    }

    const Update = async () => {
        axios(`/users/${formState.id}`, {
            method: 'PUT',
            headers: HEADER_DEFAULT,
            data: JSON.stringify({
                ...formState
            })
        }).then((response) => {
            if (response.status === 200) {
                setOpenModal(false);
                GetData(`/users/data?search=${search}&sorting=${sorting}&offset=0`).then((data) => {
                    setupData(data.data);
                    setPaginate(data.links);
                });
            }
        }).catch((error) => {
            setErrors(error.response.data.errors);
        });
    }

    const Save = async () => {
        axios(`/users`, {
            method: 'POST',
            headers: HEADER_DEFAULT,
            data: JSON.stringify({
                ...formState
            })
        }).then((response) => {
            if (response.status === 200) {
                setOpenModal(false);
                GetData(`/users/data?search=${search}&sorting=${sorting}&offset=0`).then((data) => {
                    setupData(data.data);
                    setPaginate(data.links);
                });
            }

            console.log(response)
        }).catch((error) => {
            setErrors(error.response.data.errors);
        });
    }

    const Delete = async (id: number) => {
        axios(`/users/${id}`, {
            method: 'DELETE',
            headers: HEADER_DEFAULT,
        }).then((response) => {
            if (response.status === 200) {
                setModalConfirm(false);
                GetData(`/users/data?search=${search}&sorting=${sorting}&offset=0`).then((data) => {
                    setupData(data.data);
                    setPaginate(data.links);
                });
            }
        }).catch((error) => {
            setErrors(error.response.data.errors);
        });
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Office's</h2>}
        >
            <Head title="Manage Office's" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-5 lg:px-5">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-4">
                            <div className="p-4 pt-0 h-full dark:border-gray-700 overflow-auto">
                                <div className='sticky top-0 pb-5 z-10 flex gap-5 bg-white justify-between'>
                                    <button className='flex gap-2 items-center justify-center py-2 px-5 rounded-lg bg-indigo-500 text-white font-semibold text-sm'
                                        onClick={() => OpenAddModal()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        Add Office
                                    </button>
                                    <div>
                                        <input
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            type="text" placeholder="Search" className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75" />
                                    </div>
                                </div>
                                <DataTables columns={columns} data={data} isLoading={isLoading} page={paginate} GetPaginateData={GetPaginateData} setSortingColumn={(e) => { setSorting(e.selector + ":" + e.value) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={openModal} onClose={() => CloseModal()}>
                <div className='py-5 space-y-3'>
                    <div className='flex justify-between items-center px-8'>
                        <h1 className="text-gray-900 text-2xl font-semibold">{formState.id ? 'Edit' : 'Add'} Office</h1>
                    </div>

                    <div className="space-y-3 overflow-y-auto px-8"
                        style={{ maxHeight: "calc(100vh - 20rem)" }}
                    >
                        <div className="space-y-3">
                            <div className='flex gap-2'>
                                <div className='space-y-1 w-full'>
                                    <label className="text-gray-900 text-sm font-semibold">Role</label>
                                    <select
                                        value={Number(formState.roles === null ? '' : formState.roles?.length > 0 && formState.roles[0].id)}
                                        onChange={(e) => {
                                            if (formState.roles) {
                                                setFormState({
                                                    ...formState, roles: [{
                                                        id: Number(e.target.value)
                                                    } as Role]
                                                })
                                            } else {
                                                setFormState({
                                                    ...formState, roles: [{
                                                        id: Number(e.target.value)
                                                    } as Role]
                                                })
                                            }
                                        }
                                        }
                                        className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75 w-full">
                                        <option value="">Select Role</option>
                                        {
                                            roles && roles.map((role) => {
                                                return <option key={role.id} value={role.id}>{role.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            {errors && errors.roles && <div className="text-red-500 text-xs font-semibold">{errors.roles}</div>}

                            <div className='flex gap-2'>
                                <div className='space-y-1 w-full'>
                                    <label className="text-gray-900 text-sm font-semibold">Office</label>
                                    <select
                                        value={Number(formState.office_id === null ? '' : formState.office_id)}
                                        onChange={(e) => setFormState({ ...formState, office_id: Number(e.target.value) })}
                                        className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75 w-full">
                                        <option value="">Select Office</option>
                                        {
                                            offices && offices.map((office) => {
                                                return <option key={office.id} value={office.id}>{office.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            {errors && errors.office_id && <div className="text-red-500 text-xs font-semibold">{errors.office_id}</div>}

                            <div className='flex gap-2'>
                                <div className='space-y-1 w-full'>
                                    <label className="text-gray-900 text-sm font-semibold">Name</label>
                                    <input
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="Name" className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75 w-full" />

                                </div>
                            </div>
                            {errors && errors.name && <div className="text-red-500 text-xs font-semibold">{errors.name}</div>}

                            <div className='flex gap-2'>
                                <div className='space-y-1 w-full'>
                                    <label className="text-gray-900 text-sm font-semibold">Email</label>
                                    <input
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder="Email" className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75 w-full" />

                                </div>
                            </div>
                            {errors && errors.email && <div className="text-red-500 text-xs font-semibold">{errors.email}</div>}
                            <div className='flex gap-2'>
                                <div className='space-y-1 w-full'>
                                    <label className="text-gray-900 text-sm font-semibold">Password</label>
                                    <input
                                        required
                                        onChange={(e) => setFormState({ ...formState, password: e.target.value })}

                                        placeholder="Password" className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75 w-full" />

                                </div>
                            </div>
                            {errors && errors.email && <div className="text-red-500 text-xs font-semibold">{errors.email}</div>}
                            <div className='flex gap-2'>
                                <div className='space-y-1 w-full'>
                                    <label className="text-gray-900 text-sm font-semibold">Is Locked</label>
                                    <select value={formState.is_locked === undefined ? '' : formState.is_locked ? '1' : '0'}
                                        onChange={(e) => setFormState({ ...formState, is_locked: e.target.value === "1" ? true : false })} className="focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold bg-opacity-75 w-full">
                                        <option value="">Select Is Locked</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            {errors && errors.is_locked && <div className="text-red-500 text-xs font-semibold">{errors.is_locked}</div>}
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-end'>
                        <div className='flex justify-end gap-2 py-3 px-5'>
                            <button
                                onClick={() => {
                                    CloseModal()
                                }}
                                className='py-3 px-10 rounded-lg bg-gray-200 hover:bg-gray-400 text-gray-900 font-semibold text-sm'
                            >
                                Cancel
                            </button>
                            {isLoading ?
                                <button
                                    disabled
                                    className='py-3 px-10 rounded-lg bg-gray-200 text-gray-900 font-semibold text-sm'
                                >
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </button> :
                                <button
                                    onClick={() => {
                                        { formState.id ? Update() : Save() }
                                    }}
                                    className='py-3 px-10 rounded-lg bg-[#FFBD51] hover:bg-[#eec27d] text-gray-900 font-semibold text-sm'
                                >
                                    {formState.id ? 'Update' : 'Save'}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal show={openModalConfirm}
                maxWidth='sm'
                onClose={() => {
                    CloseModal()
                }}>
                <div className='py-5 px-2 sm:px-5 space-y-3'>
                    <div className='flex justify-between items-center'>
                    </div>
                    <div className='py-3 space-y-3'>
                        <div className='flex w-full justify-center text-indigo-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-20 h-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                        </div>
                        <div className="text-center text-gray-900 text-sm font-semibold">
                            Are you sure want to delete this data?
                            <p className='font-normal text-xs'>Your data will be permanently deleted. This action cannot be undone.</p>
                        </div>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <button
                            onClick={() => {
                                CloseModal()
                            }}
                            className='py-3 px-10 rounded-lg bg-gray-200 hover:bg-gray-400 text-gray-900 font-semibold text-sm'
                        >
                            Cancel
                        </button>
                        {isLoading ?
                            <button
                                disabled
                                className='py-3 px-10 rounded-lg bg-gray-200 text-gray-900 font-semibold text-sm'
                            >
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </button> :
                            <button
                                onClick={() => {
                                    Delete(formState.id)
                                }}
                                className='py-3 px-10 rounded-lg bg-indigo-500 text-white hover:bg-[#eec27d] font-semibold text-sm'
                            >
                                Delete
                            </button>
                        }
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout >
    );
}
