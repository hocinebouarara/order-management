import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/login" element={<Login />} /> */}

          {/* Protected Routes
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/orders" element={<Layout><Orders /></Layout>} />
          <Route path="/orders/:status" element={<Layout><div className="p-4">Order Status Page Coming Soon</div></Layout>} />
          <Route path="/employees" element={<Layout><div className="p-4">Employees Page Coming Soon</div></Layout>} />
          <Route path="/employees/performance" element={<Layout><div className="p-4">Employee Performance Page Coming Soon</div></Layout>} />
          <Route path="/sellers" element={<Layout><div className="p-4">Sellers Page Coming Soon</div></Layout>} />
          <Route path="/sellers/performance" element={<Layout><div className="p-4">Seller Performance Page Coming Soon</div></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/reports" element={<Layout><div className="p-4">Reports Page Coming Soon</div></Layout>} />
          <Route path="/settings" element={<Layout><div className="p-4">Settings Page Coming Soon</div></Layout>} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
