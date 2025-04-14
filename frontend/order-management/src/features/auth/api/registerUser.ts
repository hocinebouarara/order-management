import api from "../../../lib/axios";
import { SignUpFormValues } from "../schemas/signUpSchema";

export async function registerUser(data: any) {
  const response = await api.post("/auth/register", data); // 🔁 adjust path if needed
  return response.data;
}
