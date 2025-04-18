import { Employee } from "../../types/employee";
import { formatTimeAgo } from "../../lib/utils";

interface TopEmployeesTableProps {
  employees: Employee[];
}

export function TopEmployeesTable({ employees }: TopEmployeesTableProps) {
  // Sort by performance score (using confirmation rate as a proxy)
  const sortedEmployees = [...employees]
    .filter((emp) => emp.performance?.orderConfirmationRate)
    .sort((a, b) => {
      if (a.performance && b.performance) {
        return (
          b.performance.orderConfirmationRate -
          a.performance.orderConfirmationRate
        );
      }
      return 0;
    })
    .slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left font-medium py-2">Employee</th>
            <th className="text-left font-medium py-2">Performance</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id} className="border-b last:border-0">
              <td className="py-3">
                <div className="font-medium">{employee.name}</div>
                <div className="text-xs text-muted-foreground">
                  {employee.role}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {employee.lastActivity ? employee.lastActivity.action : "N/A"}
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${
                          employee.performance
                            ? employee.performance.orderConfirmationRate * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">
                    {employee.performance
                      ? `${(
                          employee.performance.orderConfirmationRate * 100
                        ).toFixed(0)}%`
                      : "N/A"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {employee.status === "active" ? (
                    <span className="inline-flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                      Active now
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-1"></span>
                      Idle
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
