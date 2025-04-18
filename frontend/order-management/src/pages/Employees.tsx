import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  Download,
  RefreshCcw,
  UserPlus,
  Settings,
} from "lucide-react";
import { EmployeesTable } from "../components/employees/EmployeesTable";
import { mockEmployees } from "../data/mockData";
import { mockRoles, mockTeams } from "../data/mockRoles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Link } from "react-router-dom";
import { EmployeeDialog } from "../components/employees/EmployeeDialog";
import { Employee } from "../types/employee";
import { toast } from "sonner";

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [employees, setEmployees] = useState(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [activeTab, setActiveTab] = useState("all");
  const [employeeDialog, setEmployeeDialog] = useState({
    open: false,
    employee: null as Employee | null,
  });

  // Filter employees when search term or filters change
  useEffect(() => {
    let filtered = [...employees];

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (employee) => employee.status.toLowerCase() === activeTab
      );
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.name.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.role.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (employee) =>
          employee.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply role filter
    if (roleFilter) {
      filtered = filtered.filter(
        (employee) => employee.role.toLowerCase() === roleFilter.toLowerCase()
      );
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, statusFilter, roleFilter, employees, activeTab]);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setRoleFilter("");
  };

  const handleAddEmployee = () => {
    setEmployeeDialog({
      open: true,
      employee: null,
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeDialog({
      open: true,
      employee,
    });
  };

  const handleSaveEmployee = (employee: Employee) => {
    const isNewEmployee = !employees.find((e) => e.id === employee.id);

    if (isNewEmployee) {
      setEmployees([...employees, employee]);
      toast.success("Employee added successfully");
    } else {
      setEmployees(employees.map((e) => (e.id === employee.id ? employee : e)));
      toast.success("Employee updated successfully");
    }

    setEmployeeDialog({
      open: false,
      employee: null,
    });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter((e) => e.id !== employeeId));
    toast.success("Employee deleted successfully");
  };

  // Count employees by status
  const activeCount = employees.filter((e) => e.status === "active").length;
  const inactiveCount = employees.filter((e) => e.status === "inactive").length;
  const onLeaveCount = employees.filter((e) => e.status === "on leave").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/employee-roles">
              <Settings className="mr-2 h-4 w-4" />
              Manage Roles
            </Link>
          </Button>
          <Button className="bg-primary" onClick={handleAddEmployee}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            All Employees{" "}
            <Badge variant="outline" className="ml-2">
              {employees.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active{" "}
            <Badge variant="outline" className="ml-2">
              {activeCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive{" "}
            <Badge variant="outline" className="ml-2">
              {inactiveCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="on leave">
            On Leave{" "}
            <Badge variant="outline" className="ml-2">
              {onLeaveCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Employee Directory</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-statuses">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-roles">All Roles</SelectItem>
                      {mockRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    title="Reset filters"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter tags */}
              {(statusFilter || roleFilter || searchTerm) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: {searchTerm}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setSearchTerm("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {statusFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Status: {statusFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setStatusFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {roleFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Role: {roleFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setRoleFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Employees count */}
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredEmployees.length} of {employees.length}{" "}
                employees
              </div>

              {/* Employees table */}
              <EmployeesTable
                employees={filteredEmployees}
                roles={mockRoles}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Active Employees</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-statuses">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-roles">All Roles</SelectItem>
                      {mockRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    title="Reset filters"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter tags */}
              {(statusFilter || roleFilter || searchTerm) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: {searchTerm}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setSearchTerm("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {statusFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Status: {statusFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setStatusFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {roleFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Role: {roleFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setRoleFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Employees count */}
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredEmployees.length} of {employees.length}{" "}
                employees
              </div>

              {/* Employees table */}
              <EmployeesTable
                employees={filteredEmployees}
                roles={mockRoles}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Inactive Employees</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-statuses">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-roles">All Roles</SelectItem>
                      {mockRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    title="Reset filters"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter tags */}
              {(statusFilter || roleFilter || searchTerm) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: {searchTerm}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setSearchTerm("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {statusFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Status: {statusFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setStatusFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {roleFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Role: {roleFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setRoleFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Employees count */}
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredEmployees.length} of {employees.length}{" "}
                employees
              </div>

              {/* Employees table */}
              <EmployeesTable
                employees={filteredEmployees}
                roles={mockRoles}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="on leave" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Employees On Leave</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-statuses">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-roles">All Roles</SelectItem>
                      {mockRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    title="Reset filters"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter tags */}
              {(statusFilter || roleFilter || searchTerm) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: {searchTerm}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setSearchTerm("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {statusFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Status: {statusFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setStatusFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {roleFilter && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Role: {roleFilter}
                      <button
                        className="ml-2 hover:text-destructive"
                        onClick={() => setRoleFilter("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Employees count */}
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredEmployees.length} of {employees.length}{" "}
                employees
              </div>

              {/* Employees table */}
              <EmployeesTable
                employees={filteredEmployees}
                roles={mockRoles}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee dialog for adding/editing */}
      <EmployeeDialog
        open={employeeDialog.open}
        employee={employeeDialog.employee}
        roles={mockRoles}
        teams={mockTeams}
        onSave={handleSaveEmployee}
        onCancel={() => setEmployeeDialog({ open: false, employee: null })}
      />
    </div>
  );
}
