export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    offices: DataOffice[];
    roles: Role[];
    developer: boolean;
    supervisor: boolean;
    cs: boolean;
};


export interface ColumnsDataTable{
    name: string,
    selector: string,
    sortable: boolean,
    width?: string,
}

interface Sorting {
    selector: string,
    value: string,
}


export interface Paginate {
    active: boolean,
    label: string,
    url: string,
}


export interface DataOffice {
    id:         number;
    name:       string;
    address:    string;
    created_at: Date;
    updated_at: Date;
}

export interface DataUsers {
    id:                number;
    office_id:         number | null;
    name:              string;
    email:             string;
    email_verified_at: Date;
    is_locked:         boolean | string;
    created_at:        Date;
    updated_at:        Date;
    password:          string;
    roles:             Role[];
    office:            DataOffice;
}

export interface Role {
    id:         number;
    name:       string;
    guard_name: string;
    created_at: Date;
    updated_at: Date;
    pivot:      Pivot;
}

export interface Pivot {
    model_type: string;
    model_id:   number;
    role_id:    number;
}

export interface DataProvince {
    id: string;
    name:    string;
}

export interface DataCity {
    id:     string;
    province_id: string;
    name:   string;
}

export interface DataDistrict {
    id: string;
    city_id: string;
    name: string;
}

export interface DataCustomer {
    id: number;
    office_id: number;
    name: string;
    place_of_birth: string;
    date_of_birth: string;
    gender: string;
    occupation: string;
    province_id: string;
    city_id: string;
    district_id: string;
    address: string;
    rt: string;
    rw: string;
    deposit_nominal: string;
    status: string;
    created_at: string;
    updated_at: string;   
}