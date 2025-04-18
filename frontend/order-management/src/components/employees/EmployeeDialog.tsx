import { useState } from "react";
import { Employee } from "../../types/employee";
import { Role } from "../../types/role";
import { EmployeeForm } from "./EmployeeForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface EmployeeDialogProps {
  open: boolean;
  employee: Employee | null;
  roles: Role[];
  teams: string[];
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export function EmployeeDialog({
  open,
  employee,
  roles,
  teams,
  onSave,
  onCancel,
}: EmployeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription>
            {employee
              ? "Make changes to the employee profile here. Click save when you're done."
              : "Fill in the details to create a new employee profile."}
          </DialogDescription>
        </DialogHeader>

        <EmployeeForm
          employee={employee}
          roles={roles}
          teams={teams}
          onSave={onSave}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
