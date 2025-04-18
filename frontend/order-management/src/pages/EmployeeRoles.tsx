import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { RoleForm } from "../components/employees/RoleForm";
import { PermissionsList } from "../components/employees/PermissionsList";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { RolesList } from "../components/employees/RolesList";
import { Role, Permission } from "../types/role";
import { mockPermissions, mockRoles } from "../data/mockRoles";

export default function EmployeeRoles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [isCreating, setIsCreating] = useState(false);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setIsCreating(false);
  };

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsCreating(true);
  };

  const handleSaveRole = (role: Role) => {
    if (role.id) {
      // Update existing role
      setRoles(roles.map((r) => (r.id === role.id ? role : r)));
    } else {
      // Create new role
      const newRole = {
        ...role,
        id: `role-${Date.now()}`,
      };
      setRoles([...roles, newRole]);
    }
    setSelectedRole(null);
    setIsCreating(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
    if (selectedRole?.id === roleId) {
      setSelectedRole(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Roles & Permissions</h1>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="roles">Roles Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Roles</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCreateRole}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <RolesList
                  roles={roles}
                  selectedRoleId={selectedRole?.id}
                  onSelectRole={handleSelectRole}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {isCreating
                    ? "Create New Role"
                    : selectedRole
                    ? `Edit Role: ${selectedRole.name}`
                    : "Select a role to edit"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isCreating || selectedRole ? (
                  <RoleForm
                    role={selectedRole}
                    permissions={permissions}
                    onSave={handleSaveRole}
                    onCancel={() => {
                      setSelectedRole(null);
                      setIsCreating(false);
                    }}
                    onDelete={
                      selectedRole
                        ? () => handleDeleteRole(selectedRole.id)
                        : undefined
                    }
                  />
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Select a role from the list or create a new one
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                System Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PermissionsList permissions={permissions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
