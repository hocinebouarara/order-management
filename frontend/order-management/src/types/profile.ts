export type UserType = "SELLER" | "COMPANY";

export interface BaseProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  type: UserType;
  bio?: string;
  profilePicture?: string;
  isProfileComplete: boolean;
}

export interface SellerProfile extends BaseProfile {
  type: "SELLER";
}

export interface CompanyProfile extends BaseProfile {
  type: "COMPANY";
  companyName: string;
  companyLogo?: string;
}

export type Profile = SellerProfile | CompanyProfile;
