import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SellerProfile } from "../../types/profile";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import ProfileStatusIndicator from "./ProfileStatusIndicator";
import {
  User,
  Store,
  MapPin,
  Phone,
  Tag,
  Image,
  FileText,
  Save,
  BadgeInfo,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

// Mock categories for the demo
const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Beauty",
  "Sports",
  "Toys",
  "Food",
  "Books",
  "Health",
  "Automotive",
  "Jewelry",
  "Art",
  "Office",
  "Pet Supplies",
  "Travel",
];

const sellerProfileSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storeAddress: z.string().min(1, "Store address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  whatsappNumber: z.string().optional(),
  storeDescription: z.string().optional(),
  productCategories: z
    .array(z.string())
    .min(1, "Select at least one product category"),
});

interface Props {
  profile: SellerProfile;
  onSave: (profile: Partial<SellerProfile>) => Promise<void>;
}

const SellerProfileForm: React.FC<Props> = ({ profile, onSave }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | undefined
  >(profile.profilePicture);
  const [storeLogoPreview, setStoreLogoPreview] = useState<string | undefined>(
    profile.storeLogo
  );

  const form = useForm<z.infer<typeof sellerProfileSchema>>({
    resolver: zodResolver(sellerProfileSchema),
    defaultValues: {
      storeName: profile.storeName || "",
      storeAddress: profile.storeAddress || "",
      phone: profile.phone || "",
      whatsappNumber: profile.whatsappNumber || "",
      storeDescription: profile.storeDescription || "",
      productCategories: profile.productCategories || [],
    },
  });

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoreLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setStoreLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof sellerProfileSchema>) => {
    setIsSubmitting(true);
    try {
      await onSave({
        ...data,
        profilePicture: profilePicturePreview,
        storeLogo: storeLogoPreview,
      });
      toast({
        title: "Profile updated",
        description: "Your seller profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate profile completeness
  const requiredFields = [
    "storeName",
    "storeAddress",
    "phone",
    "productCategories",
  ];
  const completedRequiredFields = requiredFields.filter((field) => {
    if (field === "productCategories") {
      return profile.productCategories && profile.productCategories.length > 0;
    }
    return !!profile[field as keyof SellerProfile];
  });

  const isProfileComplete =
    completedRequiredFields.length === requiredFields.length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl">Seller Profile</CardTitle>
            <CardDescription>
              Update your seller information and store details
            </CardDescription>
          </div>
          <ProfileStatusIndicator isComplete={isProfileComplete} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Read-only fields section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <BadgeInfo className="h-4 w-4" /> Username
                  </Label>
                  <Input
                    id="username"
                    value={profile.username}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <BadgeInfo className="h-4 w-4" /> Email
                  </Label>
                  <Input
                    id="email"
                    value={profile.email}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              {/* Profile picture upload section */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-32 h-32 overflow-hidden rounded-full border-2 border-primary/20">
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <Label
                    htmlFor="profilePicture"
                    className="flex items-center justify-center gap-2"
                  >
                    <Image className="h-4 w-4" /> Profile Picture
                  </Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Store information */}
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Store className="h-4 w-4" /> Store Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your store name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Store Address
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Store address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone number" type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> WhatsApp Number (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="WhatsApp number"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Store logo upload */}
              <div className="space-y-4">
                <Label htmlFor="storeLogo" className="flex items-center gap-2">
                  <Image className="h-4 w-4" /> Store Logo
                </Label>
                <div className="flex flex-col gap-4">
                  {storeLogoPreview && (
                    <div className="relative w-32 h-32 overflow-hidden rounded-md border border-border">
                      <img
                        src={storeLogoPreview}
                        alt="Store Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <Input
                    id="storeLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleStoreLogoChange}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Product categories */}
              <FormField
                control={form.control}
                name="productCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Tag className="h-4 w-4" /> Product Categories
                    </FormLabel>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.value.map((category) => (
                          <div
                            key={category}
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {category}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedCategories = field.value.filter(
                                  (c) => c !== category
                                );
                                field.onChange(updatedCategories);
                              }}
                              className="text-primary/70 hover:text-primary rounded-full"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        onChange={(e) => {
                          if (
                            e.target.value &&
                            !field.value.includes(e.target.value)
                          ) {
                            field.onChange([...field.value, e.target.value]);
                          }
                          e.target.value = "";
                        }}
                      >
                        <option value="">Select categories...</option>
                        {PRODUCT_CATEGORIES.filter(
                          (cat) => !field.value.includes(cat)
                        ).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Store description */}
            <FormField
              control={form.control}
              name="storeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Store Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your store and products"
                      className="min-h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isProfileComplete && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md text-amber-800 dark:text-amber-200 text-sm">
                <strong>Complete your profile:</strong> Please fill in all
                required fields to complete your seller profile.
              </div>
            )}

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SellerProfileForm;
