import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "../schemas/signUpSchema";
import { Button } from "../../../components/ui/button";

interface PasswordInputProps {
  form: UseFormReturn<SignUpFormValues>;
  name: "password" | "confirmPassword";
  label: string;
  placeholder: string;
}

export function PasswordInput({ form, name, label, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                className="pl-10 bg-background/50 border-border/50 focus-visible:ring-primary" 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                {...field} 
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1 h-8 w-8 hover:bg-primary/10"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}