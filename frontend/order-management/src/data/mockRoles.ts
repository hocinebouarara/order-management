import { Role, Permission } from "../types/role";

// Default permissions in the system
export const mockPermissions: Permission[] = [
  {
    id: "view-dashboard",
    name: "View Dashboard",
    description: "Can view the main dashboard with key metrics and reports",
    category: "Dashboard",
  },
  {
    id: "view-orders",
    name: "View Orders",
    description: "Can view all orders in the system",
    category: "Orders",
  },
  {
    id: "edit-orders",
    name: "Edit Orders",
    description: "Can modify order details and status",
    category: "Orders",
  },
  {
    id: "delete-orders",
    name: "Delete Orders",
    description: "Can delete orders from the system",
    category: "Orders",
  },
  {
    id: "view-employees",
    name: "View Employees",
    description: "Can view employee profiles and basic information",
    category: "Employees",
  },
  {
    id: "edit-employees",
    name: "Edit Employees",
    description: "Can modify employee details and roles",
    category: "Employees",
  },
  {
    id: "manage-roles",
    name: "Manage Roles",
    description: "Can create, edit, and delete roles and permissions",
    category: "Employees",
  },
  {
    id: "view-products",
    name: "View Products",
    description: "Can view product listings and details",
    category: "Products",
  },
  {
    id: "edit-products",
    name: "Edit Products",
    description: "Can modify product details, pricing, and inventory",
    category: "Products",
  },
  {
    id: "delete-products",
    name: "Delete Products",
    description: "Can remove products from the system",
    category: "Products",
  },
  {
    id: "view-reports",
    name: "View Reports",
    description: "Can access standard system reports",
    category: "Reports",
  },
  {
    id: "create-reports",
    name: "Create Reports",
    description: "Can generate custom reports",
    category: "Reports",
  },
  {
    id: "view-settings",
    name: "View Settings",
    description: "Can view system settings",
    category: "Settings",
  },
  {
    id: "edit-settings",
    name: "Edit Settings",
    description: "Can modify system settings",
    category: "Settings",
  },
  {
    id: "view-sellers",
    name: "View Sellers",
    description: "Can view seller profiles and information",
    category: "Sellers",
  },
  {
    id: "edit-sellers",
    name: "Edit Sellers",
    description: "Can modify seller details and status",
    category: "Sellers",
  },
];

// Default roles in the system
export const mockRoles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all system features and settings",
    permissions: mockPermissions.map((p) => p.id),
    isAdmin: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "manager",
    name: "Manager",
    description:
      "Can manage employees, orders, and products, but cannot modify system settings",
    permissions: [
      "view-dashboard",
      "view-orders",
      "edit-orders",
      "view-employees",
      "edit-employees",
      "view-products",
      "edit-products",
      "view-reports",
      "create-reports",
      "view-settings",
      "view-sellers",
      "edit-sellers",
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "sales-agent",
    name: "Sales Agent",
    description: "Can view and process orders, limited access to other modules",
    permissions: [
      "view-dashboard",
      "view-orders",
      "edit-orders",
      "view-products",
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "support",
    name: "Support Agent",
    description: "Can view orders and provide customer support",
    permissions: ["view-dashboard", "view-orders", "view-products"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// List of sample teams
export const mockTeams = [
  "Sales Team",
  "Support Team",
  "Product Team",
  "Marketing Team",
  "Operations Team",
];
