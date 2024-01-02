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

export interface Admin {
  id?: number;
  organizationName: string;
  vendorName: string;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}
