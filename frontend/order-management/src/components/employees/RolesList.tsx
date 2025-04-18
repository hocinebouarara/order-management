import { Role } from "../../types/role";
import { Button } from "../../components/ui/button";
import { ShieldAlert, Users } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";

interface RolesListProps {
  roles: Role[];
  selectedRoleId?: string | null;
  onSelectRole: (role: Role) => void;
}

export function RolesList({
  roles,
  selectedRoleId,
  onSelectRole,
}: RolesListProps) {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-2">
        {roles.map((role) => (
          <Button
            key={role.id}
            variant={selectedRoleId === role.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSelectRole(role)}
          >
            {role.isAdmin ? (
              <ShieldAlert className="mr-2 h-4 w-4" />
            ) : (
              <Users className="mr-2 h-4 w-4" />
            )}
            <span className="flex-1 text-left">{role.name}</span>
            <Badge variant="outline" className="ml-2">
              {role.permissions.length} perms
            </Badge>
          </Button>
        ))}

        {roles.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No roles defined yet
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
