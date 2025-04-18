import { useState } from "react";
import { Button } from "../components/ui/button";
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
import {
  BarChart3,
  ListFilter,
  ShoppingBag,
  CheckCircle,
  XCircle,
  RefreshCw,
  Users,
  Briefcase,
  Clock,
  DollarSign,
  BarChart2,
  PieChart,
  Clock3,
  LineChart,
} from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { TopEmployeesTable } from "../components/dashboard/TopEmployeesTable";
import { PerformanceOverview } from "../components/dashboard/PerformanceOverview";
import { OrderStatusDistribution } from "../components/dashboard/OrderStatusDistribution";
import { ConfirmationRateCard } from "../components/dashboard/ConfirmationRateCard";
import { DeliveryStatusCard } from "../components/dashboard/DeliveryStatusCard";
import { RecentOrdersTable } from "../components/dashboard/RecentOrderTables";

// Sample data for demonstration
const recentOrders = [
  {
    id: "ORD-7352",
    customerName: "John Doe",
    date: "2025-04-15T14:30:00",
    amount: 1250.99,
    platform: "Website",
    status: "delivered" as const,
  },
  {
    id: "ORD-7353",
    customerName: "Jane Smith",
    date: "2025-04-15T10:15:00",
    amount: 450.0,
    platform: "Mobile App",
    status: "processing" as const,
  },
  {
    id: "ORD-7354",
    customerName: "Alex Johnson",
    date: "2025-04-14T16:45:00",
    amount: 825.5,
    platform: "Website",
    status: "pending" as const,
  },
  {
    id: "ORD-7355",
    customerName: "Sarah Williams",
    date: "2025-04-14T09:30:00",
    amount: 1100.75,
    platform: "Mobile App",
    status: "canceled" as const,
  },
  {
    id: "ORD-7356",
    customerName: "Michael Brown",
    date: "2025-04-13T11:20:00",
    amount: 675.25,
    platform: "Website",
    status: "delivered" as const,
  },
];

const topEmployees = [
  {
    id: "EMP-001",
    name: "Emma Johnson",
    email: "emma@example.com",
    phone: "555-1234",
    role: "Order Manager",
    status: "active",
    lastActivity: {
      time: "2025-04-15T15:30:00",
      action: "28 orders processed",
    },
    performance: {
      orderConfirmationRate: 0.95,
      callSuccessRate: 0.88,
      upsellRate: 0.22,
      avgConfirmationTime: 8.5,
    },
  },
  {
    id: "EMP-002",
    name: "David Lee",
    email: "david@example.com",
    phone: "555-5678",
    role: "Sales Agent",
    status: "active",
    lastActivity: {
      time: "2025-04-15T14:45:00",
      action: "22 orders processed",
    },
    performance: {
      orderConfirmationRate: 0.87,
      callSuccessRate: 0.92,
      upsellRate: 0.31,
      avgConfirmationTime: 7.2,
    },
  },
  {
    id: "EMP-003",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "555-9012",
    role: "Customer Service",
    status: "away",
    lastActivity: {
      time: "2025-04-15T12:15:00",
      action: "18 orders processed",
    },
    performance: {
      orderConfirmationRate: 0.82,
      callSuccessRate: 0.85,
      upsellRate: 0.19,
      avgConfirmationTime: 9.1,
    },
  },
  {
    id: "EMP-004",
    name: "Jason Wang",
    email: "jason@example.com",
    phone: "555-3456",
    role: "Order Manager",
    status: "active",
    lastActivity: {
      time: "2025-04-15T13:30:00",
      action: "20 orders processed",
    },
    performance: {
      orderConfirmationRate: 0.79,
      callSuccessRate: 0.81,
      upsellRate: 0.25,
      avgConfirmationTime: 8.9,
    },
  },
  {
    id: "EMP-005",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "555-7890",
    role: "Sales Agent",
    status: "active",
    lastActivity: {
      time: "2025-04-15T11:45:00",
      action: "15 orders processed",
    },
    performance: {
      orderConfirmationRate: 0.75,
      callSuccessRate: 0.79,
      upsellRate: 0.22,
      avgConfirmationTime: 10.2,
    },
  },
];

export default function Dashboard() {
  const [timeView, setTimeView] = useState("weekly");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ListFilter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <LineChart className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
            <StatsCard
              title="Total Orders"
              value="12,480"
              icon={<ShoppingBag size={18} />}
              description="All time orders"
              trend={{ value: 8, positive: true }}
            />
            <StatsCard
              title="Confirmed Orders"
              value="8,200"
              icon={<CheckCircle size={18} />}
              description="Successfully processed"
              trend={{ value: 5, positive: true }}
              className="bg-green-50 dark:bg-green-950"
            />
            <StatsCard
              title="Canceled Orders"
              value="1,130"
              icon={<XCircle size={18} />}
              description="Customer cancellations"
              trend={{ value: 2, positive: false }}
              className="bg-red-50 dark:bg-red-950"
            />
            <StatsCard
              title="Returned Orders"
              value="420"
              icon={<RefreshCw size={18} />}
              description="Post-delivery returns"
              trend={{ value: 3, positive: true }}
              className="bg-orange-50 dark:bg-orange-950"
            />
            <StatsCard
              title="Total Employees"
              value="42"
              icon={<Users size={18} />}
              description="3 new this week"
            />
            <StatsCard
              title="Total Sellers"
              value="18"
              icon={<Briefcase size={18} />}
              description="2 joined this week"
            />
            <StatsCard
              title="Pending Confirmations"
              value="328"
              icon={<Clock size={18} />}
              description="Waiting to be confirmed"
              className="bg-yellow-50 dark:bg-yellow-950"
            />
            <StatsCard
              title="Total Revenue"
              value="1,150,000 DZD"
              icon={<DollarSign size={18} />}
              description="Gross revenue"
              trend={{ value: 12, positive: true }}
              className="bg-blue-50 dark:bg-blue-950"
            />
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <RecentOrdersTable orders={recentOrders} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Volume Over Time</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={timeView === "daily" ? "default" : "outline"}
                    onClick={() => setTimeView("daily")}
                    size="sm"
                  >
                    Daily
                  </Button>
                  <Button
                    variant={timeView === "weekly" ? "default" : "outline"}
                    onClick={() => setTimeView("weekly")}
                    size="sm"
                  >
                    Weekly
                  </Button>
                  <Button
                    variant={timeView === "monthly" ? "default" : "outline"}
                    onClick={() => setTimeView("monthly")}
                    size="sm"
                  >
                    Monthly
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <PerformanceOverview />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <OrderStatusDistribution />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full md:col-span-1">
              <CardHeader>
                <CardTitle>Confirmation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ConfirmationRateCard />
              </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-1">
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryStatusCard />
              </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-1">
              <CardHeader>
                <CardTitle>Top Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <TopEmployeesTable employees={topEmployees} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="h-[400px] flex items-center justify-center"
        >
          <p className="text-muted-foreground">
            Analytics tab content will appear here
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
