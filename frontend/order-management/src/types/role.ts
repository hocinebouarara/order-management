export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[]; // Array of permission IDs
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
