import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// تعريف نوع البيانات اللي راح نخزنها في الـ Context
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

// إنشاء الـ Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// الـ Provider اللي يلف التطبيق بتاعنا ويعرض الـ Context للمكونات الأخرى
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log("📦 Stored User:", storedUser);
    console.log("🔐 Stored Token:", token);

    if (storedUser && storedUser !== "undefined" && token) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("❌ Error parsing user from localStorage:", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  // دالة لتسجيل الدخول (login)
  const login = (userData: { token: string; userDTO: any }) => {
    console.log("🧠 Login Called with: ", userData); // ✅ أضف هذا هنا
    if (userData.userDTO && userData.token) {
      setUser(userData.userDTO);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData.userDTO));
      localStorage.setItem("token", userData.token);
    } else {
      console.warn("🚨 userDTO or token is missing in login data");
    }
  };

  // دالة لتسجيل الخروج (logout)
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // نحذف بيانات المستخدم من localStorage
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook لتسهيل الوصول للـ Context في أي مكان في التطبيق
export const useAuth = () => useContext(AuthContext);
