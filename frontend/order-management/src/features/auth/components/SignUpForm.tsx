import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { PasswordInput } from "./PasswordInput";
import { UserTypeSelect } from "./UserTypeSelect";
import { NameEmailInputs } from "./NameEmailInputs";
import { UsernameInput } from "./UsernameInput";

import {
  signUpSchema,
  SignUpFormValues,
  userTypeLabels,
} from "../schemas/signUpSchema";
import { registerUser } from "../api/registerUser";

export function SignUpForm() {
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      userType: undefined,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await registerUser(data); // ✅ Call API function

      toast.success("Account created successfully!");
      navigate("/"); // ✅ Redirect to home
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.log(err.response);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4 bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/30 shadow-sm">
          <NameEmailInputs form={form} />
          <UsernameInput form={form} />
        </div>

        <UserTypeSelect form={form} />

        <div className="space-y-4 bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/30 shadow-sm">
          <PasswordInput
            form={form}
            name="password"
            label="Password"
            placeholder="Create a password"
          />
          <PasswordInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
}
