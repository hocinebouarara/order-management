import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CompanyProfile } from "../../types/profile";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ProfileStatusIndicator from "./ProfileStatusIndicator";
import {
  User,
  Building2,
  MapPin,
  Phone,
  Globe,
  Image,
  FileText,
  Save,
  Link,
  BadgeInfo,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

// Mock coverage areas for the demo
const COVERAGE_AREAS = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington D.C.",
];

const COMPANY_TYPES = [
  { value: "local", label: "Local" },
  { value: "express", label: "Express" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
  { value: "other", label: "Other" },
];

const companyProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  whatsappNumber: z.string().optional(),
  trackingUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.string().length(0))
    .optional(),
  companyType: z.enum([
    "local",
    "express",
    "national",
    "international",
    "other",
  ]),
  coverageAreas: z
    .array(z.string())
    .min(1, "Select at least one coverage area"),
  description: z.string().optional(),
});

interface Props {
  profile: CompanyProfile;
  onSave: (profile: Partial<CompanyProfile>) => Promise<void>;
}

const CompanyProfileForm: React.FC<Props> = ({ profile, onSave }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | undefined
  >(profile.profilePicture);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<
    string | undefined
  >(profile.companyLogo);

  const form = useForm<z.infer<typeof companyProfileSchema>>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: profile.companyName || "",
      companyAddress: profile.companyAddress || "",
      phone: profile.phone || "",
      whatsappNumber: profile.whatsappNumber || "",
      trackingUrl: profile.trackingUrl || "",
      companyType: profile.companyType || "local",
      coverageAreas: profile.coverageAreas || [],
      description: profile.description || "",
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

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof companyProfileSchema>) => {
    setIsSubmitting(true);
    try {
      await onSave({
        ...data,
        profilePicture: profilePicturePreview,
        companyLogo: companyLogoPreview,
      });
      toast({
        title: "Profile updated",
        description: "Your company profile has been successfully updated.",
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
    "companyName",
    "companyAddress",
    "phone",
    "companyType",
    "coverageAreas",
  ];
  const completedRequiredFields = requiredFields.filter((field) => {
    if (field === "coverageAreas") {
      return profile.coverageAreas && profile.coverageAreas.length > 0;
    }
    return !!profile[field as keyof CompanyProfile];
  });

  const isProfileComplete =
    completedRequiredFields.length === requiredFields.length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl">Company Profile</CardTitle>
            <CardDescription>
              Update your company information and coverage details
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
              {/* Company information */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Company Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your company name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Company Address
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company address" />
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
              <FormField
                control={form.control}
                name="trackingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link className="h-4 w-4" /> Tracking URL (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com/tracking"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Company Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMPANY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Company logo upload */}
              <div className="space-y-4">
                <Label
                  htmlFor="companyLogo"
                  className="flex items-center gap-2"
                >
                  <Image className="h-4 w-4" /> Company Logo
                </Label>
                <div className="flex flex-col gap-4">
                  {companyLogoPreview && (
                    <div className="relative w-32 h-32 overflow-hidden rounded-md border border-border">
                      <img
                        src={companyLogoPreview}
                        alt="Company Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <Input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleCompanyLogoChange}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Coverage areas */}
              <FormField
                control={form.control}
                name="coverageAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Coverage Areas
                    </FormLabel>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.value.map((area) => (
                          <div
                            key={area}
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {area}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedAreas = field.value.filter(
                                  (a) => a !== area
                                );
                                field.onChange(updatedAreas);
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
                        <option value="">Select coverage areas...</option>
                        {COVERAGE_AREAS.filter(
                          (area) => !field.value.includes(area)
                        ).map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Company description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Company Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your company services"
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
                required fields to complete your company profile.
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

export default CompanyProfileForm;
