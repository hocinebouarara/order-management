import React, { useState } from "react";
import { SellerProfile, CompanyProfile, UserType } from "../types/profile";
import SellerProfileForm from "../components/profile/SellerProfileForm";
import CompanyProfileForm from "../components/profile/CompanyProfileForm";

// Mock data for demo purposes
const mockSellerProfile: SellerProfile = {
  id: "seller-123",
  fullName: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  phone: "1234567890",
  userType: "seller",
  isProfileComplete: false,
  storeName: "",
  storeAddress: "",
  productCategories: [],
  profilePicture:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const mockCompanyProfile: CompanyProfile = {
  id: "company-456",
  fullName: "Jane Smith",
  username: "janesmith",
  email: "jane.smith@example.com",
  phone: "0987654321",
  userType: "company",
  isProfileComplete: false,
  companyName: "",
  companyAddress: "",
  coverageAreas: [],
  companyType: "local",
};

const ProfileManagement: React.FC = () => {
  // In a real application, this would come from authentication context or API
  const [userType, setUserType] = useState<UserType>("seller");
  const [sellerProfile, setSellerProfile] =
    useState<SellerProfile>(mockSellerProfile);
  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfile>(mockCompanyProfile);

  // For demo purposes, add a toggle to switch between user types
  const toggleUserType = () => {
    setUserType(userType === "seller" ? "company" : "seller");
  };

  const handleSaveSellerProfile = async (
    updatedProfile: Partial<SellerProfile>
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send this to your API
    console.log("Saving seller profile:", updatedProfile);

    // Update local state
    setSellerProfile((prev) => ({
      ...prev,
      ...updatedProfile,
      isProfileComplete: true, // This would be determined by your validation logic
    }));
  };

  const handleSaveCompanyProfile = async (
    updatedProfile: Partial<CompanyProfile>
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send this to your API
    console.log("Saving company profile:", updatedProfile);

    // Update local state
    setCompanyProfile((prev) => ({
      ...prev,
      ...updatedProfile,
      isProfileComplete: true, // This would be determined by your validation logic
    }));
  };

  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile Management</h1>

        {/* This toggle is just for demo purposes */}
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium">Demo: Switch User Type</p>
          <button
            onClick={toggleUserType}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
          >
            Switch to {userType === "seller" ? "Company" : "Seller"} Profile
          </button>
        </div>
      </div>

      {userType === "seller" ? (
        <SellerProfileForm
          profile={sellerProfile}
          onSave={handleSaveSellerProfile}
        />
      ) : (
        <CompanyProfileForm
          profile={companyProfile}
          onSave={handleSaveCompanyProfile}
        />
      )}
    </div>
  );
};

export default ProfileManagement;
