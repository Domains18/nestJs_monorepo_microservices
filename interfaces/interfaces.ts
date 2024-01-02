// Objective: Define interfaces for the project
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


export interface Organization {
  id?: number;
  organizationName: string;
  description: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  logo?: string;
 
}
