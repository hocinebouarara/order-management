import { AtSign } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "../schemas/signUpSchema";

interface UsernameInputProps {
  form: UseFormReturn<SignUpFormValues>;
}

export function UsernameInput({ form }: UsernameInputProps) {
  // Adding a console log to help debug
  console.log("Rendering UsernameInput component");
  
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Username</FormLabel>
          <FormControl>
            <div className="relative">
              <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                className="pl-10 bg-background/50 border-border/40 focus-visible:ring-primary" 
                placeholder="Choose a username" 
                {...field} 
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}