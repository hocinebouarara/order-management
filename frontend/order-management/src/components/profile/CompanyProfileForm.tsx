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

const companyProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Company address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  whatsapp: z.string().optional(),
  bio: z.string().optional(),
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
      address: profile.address || "",
      phone: profile.phone || "",
      whatsapp: profile.whatsapp || "",
      bio: profile.bio || "",
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
      const updatedProfile: Partial<CompanyProfile> = {
        ...profile, // تأكد أنك تبدأ من البيانات الأصلية
        ...data, // ثم تقوم بتحديثها بما هو داخل الفورم
        profilePicture: profilePicturePreview,
        companyLogo: companyLogoPreview,
      };

      console.log("Updated profile data:", updatedProfile);

      // استدعاء الدالة التي تم تمريرها من المكون الأب (ProfileManagement)
      await onSave(updatedProfile); // هذه هي دالة handleSaveProfile

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
  const requiredFields = ["companyName", "address", "phone"];
  const completedRequiredFields = requiredFields.filter((field) => {
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
          <ProfileStatusIndicator
            isComplete={isProfileComplete}
            percentage={90}
          />
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
                  <Input id="fullName" value={profile.fullName} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <BadgeInfo className="h-4 w-4" /> Username
                  </Label>
                  <Input id="username" value={profile.username} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <BadgeInfo className="h-4 w-4" /> Email
                  </Label>
                  <Input id="email" value={profile.email} />
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
                name="address"
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
                name="whatsapp"
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
            </div>

            {/* Company description */}
            <FormField
              control={form.control}
              name="bio"
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
