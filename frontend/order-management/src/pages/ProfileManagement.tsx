import React, { useEffect, useState } from "react";
import {
  SellerProfile,
  CompanyProfile,
  UserType,
  Profile,
} from "../types/profile";
import SellerProfileForm from "../components/profile/SellerProfileForm";
import CompanyProfileForm from "../components/profile/CompanyProfileForm";
import {
  fetchProfile,
  updateProfile,
} from "../features/profile/profileService";

const ProfileManagement: React.FC = () => {
  // In a real application, this would come from authentication context or API
  const [userType, setUserType] = useState<UserType>("SELLER");
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(
    null
  );
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const profile = await fetchProfile();

      if (profile.type === "SELLER") {
        setSellerProfile(profile as SellerProfile);
        setUserType("SELLER");
      } else {
        setCompanyProfile(profile as CompanyProfile);
        setUserType("COMPANY");
      }
    } catch (err) {
      console.error("فشل تحميل البيانات", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSaveProfile = async (updatedProfile: Partial<Profile>) => {
    try {
      const saved = await updateProfile(updatedProfile);
      await loadProfile();

      console.log("تم حفظ البروفايل الموحد:", saved);
    } catch (err) {
      console.error("فشل حفظ البروفايل", err);
    }
  };

  const handleSaveCompanyProfile = async (
    updatedProfile: Partial<CompanyProfile>
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send this to your API
    console.log("Saving company profile:", updatedProfile);

    // Update local state
  };

  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile Management</h1>
      </div>

      {loading ? (
        <p>جارٍ تحميل بيانات الملف الشخصي...</p>
      ) : userType === "SELLER" ? (
        sellerProfile ? (
          <SellerProfileForm
            profile={sellerProfile}
            onSave={handleSaveProfile}
          />
        ) : (
          <p>لا توجد بيانات للبائع.</p>
        )
      ) : companyProfile ? (
        <CompanyProfileForm
          profile={companyProfile}
          onSave={handleSaveProfile}
        />
      ) : (
        <p>لا توجد بيانات للشركة.</p>
      )}
    </div>
  );
};

export default ProfileManagement;
