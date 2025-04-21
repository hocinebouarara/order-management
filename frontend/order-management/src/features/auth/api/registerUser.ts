import api from "../../../lib/axios";
import { SignUpFormValues } from "../schemas/signUpSchema";

// Expected to return { token: string }
export async function registerUser(
  data: SignUpFormValues
): Promise<{ token: string; userDTO: any }> {
  const response = await api.post("/auth/register", data);
  return response.data as { token: string; userDTO: any };
}
