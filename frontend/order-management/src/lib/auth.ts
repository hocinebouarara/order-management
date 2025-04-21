export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return !!token;
}
