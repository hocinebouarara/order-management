import { Permission } from "../../types/role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { useState } from "react";

interface PermissionsListProps {
  permissions: Permission[];
}

export function PermissionsList({ permissions }: PermissionsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter permissions based on search term
  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group permissions by category
  const groupedPermissions: Record<string, Permission[]> = {};
  filteredPermissions.forEach((permission) => {
    if (!groupedPermissions[permission.category]) {
      groupedPermissions[permission.category] = [];
    }
    groupedPermissions[permission.category].push(permission);
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search permissions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4"
      />

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No permissions found.
                </TableCell>
              </TableRow>
            ) : (
              Object.entries(groupedPermissions).map(
                ([category, categoryPermissions]) =>
                  categoryPermissions.map((permission, index) => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">
                        {permission.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{permission.category}</Badge>
                      </TableCell>
                      <TableCell>{permission.description}</TableCell>
                    </TableRow>
                  ))
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
