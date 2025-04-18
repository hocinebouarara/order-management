import { useState, useEffect } from "react";
import { Role, Permission } from "../../types/role";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Card, CardContent } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Check, Trash } from "lucide-react";

interface RoleFormProps {
  role: Role | null;
  permissions: Permission[];
  onSave: (role: Role) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function RoleForm({
  role,
  permissions,
  onSave,
  onCancel,
  onDelete,
}: RoleFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description || "");
      setIsAdmin(role.isAdmin || false);
      setSelectedPermissions(role.permissions);
    } else {
      setName("");
      setDescription("");
      setIsAdmin(false);
      setSelectedPermissions([]);
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedRole: Role = {
      id: role ? role.id : "",
      name,
      description,
      isAdmin,
      permissions: selectedPermissions,
      createdAt: role ? role.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedRole);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    }
  };

  // Group permissions by category
  const permissionsByCategory: Record<string, Permission[]> = {};
  permissions.forEach((permission) => {
    if (!permissionsByCategory[permission.category]) {
      permissionsByCategory[permission.category] = [];
    }
    permissionsByCategory[permission.category].push(permission);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Sales Manager"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role and its responsibilities"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="admin" checked={isAdmin} onCheckedChange={setIsAdmin} />
            <Label htmlFor="admin">Administrator Role</Label>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Label className="mb-4 block">Permissions</Label>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                {Object.entries(permissionsByCategory).map(
                  ([category, categoryPermissions]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {categoryPermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-2"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={selectedPermissions.includes(
                                permission.id
                              )}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(
                                  permission.id,
                                  checked === true
                                )
                              }
                            />
                            <div className="grid gap-1.5">
                              <Label
                                htmlFor={permission.id}
                                className="font-medium"
                              >
                                {permission.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-4">
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />
              Save Role
            </Button>
          </div>

          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the role and may affect users assigned to it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </form>
  );
}
