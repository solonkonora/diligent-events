"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

type Profile = {
  id: string;
  full_name: string;
  role: string;
  phone?: string;
};

type ProfileSectionProps = {
  profile: Profile;
  onProfileUpdate?: (updatedProfile: Profile) => void;
};

export default function ProfileSection({
  profile,
  onProfileUpdate,
}: ProfileSectionProps) {
  const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfile = async () => {
    // Validation
    if (!updatedProfile.full_name?.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: updatedProfile.full_name,
          phone: updatedProfile.phone,
        })
        .eq("id", profile.id);

      if (error) {
        toast.error("Failed to update profile");
      } else {
        toast.success("Profile updated successfully");
        if (onProfileUpdate) {
          onProfileUpdate(updatedProfile);
        }
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <h2 className="mb-6 text-xl font-semibold text-gray-700">My Profile</h2>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              value={updatedProfile.full_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              value={updatedProfile.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-2">
            <button
              onClick={updateProfile}
              disabled={isUpdating}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700">Password</h3>
          <p className="mt-1 text-sm text-gray-500">
            For security reasons, you can't view your current password.
          </p>
          <button
            onClick={() => toast.success("Password reset email sent!")}
            className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
}
