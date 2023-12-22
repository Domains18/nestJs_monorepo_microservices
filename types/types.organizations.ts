type organization = [] | {
    id: number,
    name: string,
    description: string,
    address: string,
    phone: string,
    users?: [],
    organization_id?: number,
    transactions?: [],
    created_at?: string,
    updated_at?: string | null
}

type user = [] | {
    firstName: string,
    lastName: string,
    email: string,
    id: number,
    password: string,
    organizationName: string,
    role: string,
    organization_id: number,
}

type transaction = [] | {
    id: number,
    amount: number,
    description: string,
    organization_id: number,
    created_at: string,
    updated_at: string | null
}


type role = [] | {
    id: number,
    name: string,
    description: string,
    created_at: string,
    updated_at: string | null
}
