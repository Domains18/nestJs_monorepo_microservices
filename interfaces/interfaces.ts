export interface Organization {
    organizationName: string;
    description: string;
    website: string;
    email: string;
    phone: String;
    logo: string;
    users?: [];
    vendors?: [];
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organization: string;
    vendor: string;

}
