
import { Mail, User } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "../schemas/signUpSchema";

interface NameEmailInputsProps {
  form: UseFormReturn<SignUpFormValues>;
}

export function NameEmailInputs({ form }: NameEmailInputsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Full Name</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input className="pl-10 bg-background/50 border-border/50 focus-visible:ring-primary" placeholder="Your name" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Email</FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input className="pl-10 bg-background/50 border-border/50 focus-visible:ring-primary" type="email" placeholder="your.email@example.com" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
