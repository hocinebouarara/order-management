
import { Building, Store } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "../schemas/signUpSchema";

interface UserTypeSelectProps {
  form: UseFormReturn<SignUpFormValues>;
}

export function UserTypeSelect({ form }: UserTypeSelectProps) {
  return (
    <FormField
      control={form.control}
      name="userType"
      render={({ field }) => (
        <FormItem className="space-y-3 bg-card/40 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-sm">
          <FormLabel className="text-sm font-medium">Account Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <FormItem className="flex items-center space-x-3 space-y-0 rounded-md p-2 cursor-pointer hover:bg-primary/5 transition-colors">
                <FormControl>
                  <RadioGroupItem value="seller" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <div>
                    <div>Seller</div>
                    <div className="text-xs text-muted-foreground">For individuals selling products or services</div>
                  </div>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 rounded-md p-2 cursor-pointer hover:bg-primary/5 transition-colors">
                <FormControl>
                  <RadioGroupItem value="company" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <div>Order Confirmation Company</div>
                    <div className="text-xs text-muted-foreground">For businesses managing and confirming orders</div>
                  </div>
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}