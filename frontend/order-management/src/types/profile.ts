export type UserType = "seller" | "company";

export interface BaseProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  isProfileComplete: boolean;
  userType: UserType;
  description?: string;
  profilePicture?: string;
}

export interface SellerProfile extends BaseProfile {
  userType: "seller";
  storeName: string;
  storeAddress: string;
  storeDescription?: string;
  storeLogo?: string;
  productCategories: string[];
}

export interface CompanyProfile extends BaseProfile {
  userType: "company";
  companyName: string;
  companyAddress: string;
  companyLogo?: string;
  coverageAreas: string[];
  trackingUrl?: string;
  companyType: "local" | "express" | "national" | "international" | "other";
}

export type Profile = SellerProfile | CompanyProfile;
