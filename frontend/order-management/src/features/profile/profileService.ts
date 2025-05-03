import api from "../../lib/axios";
import { CompanyProfile, Profile, SellerProfile } from "../../types/profile";

export async function fetchProfile(): Promise<SellerProfile | CompanyProfile> {
  const response = await api.get("/profile");
  return response.data as SellerProfile | CompanyProfile;
}

export const updateProfile = async (
  updatedProfile: Partial<Profile>
): Promise<Profile> => {
  const response = await api.put<Profile>("/profile", updatedProfile);
  return response.data;
};
