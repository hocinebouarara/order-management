import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && token) {
      try {
        setUser(JSON.parse(storedUser)); // إذا كانت البيانات صحيحة، نقوم بتحليلها
        setIsAuthenticated(true); // المستخدم مسجل الدخول
      } catch (error) {
        console.error("خطأ في تحليل بيانات المستخدم من localStorage:", error);
        setUser(null); // في حالة حدوث خطأ، يتم إعادة تعيين المستخدم
        setIsAuthenticated(false); // تغيير الحالة إلى غير مسجل دخول
      }
    } else {
      setUser(null); // إذا كانت البيانات غير موجودة أو غير صالحة
      setIsAuthenticated(false); // تغيير الحالة إلى غير مسجل دخول
    }

    setLoading(false); // عند الانتهاء من التحقق، نوقف تحميل البيانات
  }, []);

  // دالة لتسجيل الدخول (login)
  const login = (userData: { token: string; userDTO: any }) => {
    setUser(userData.userDTO);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData.userDTO));
    localStorage.setItem("token", userData.token);
  };

  // دالة لتسجيل الخروج (logout)
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // نحذف بيانات المستخدم من localStorage
    localStorage.removeItem("token");
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
