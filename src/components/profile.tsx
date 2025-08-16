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
      <h2 className="text-foreground mb-6 text-xl font-semibold">My Profile</h2>
      <div className="bg-card rounded-lg p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-foreground block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              className="border-border bg-background text-foreground focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
              value={updatedProfile.full_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-foreground block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="border-border bg-background text-foreground focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
              value={updatedProfile.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-2">
            <button
              onClick={updateProfile}
              disabled={isUpdating}
              className="bg-primary text-primary-foreground hover:bg-primary/80 disabled:bg-muted disabled:text-muted-foreground rounded-md px-4 py-2"
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-foreground text-lg font-medium">Password</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            For security reasons, you can't view your current password.
          </p>
          <button
            onClick={() => toast.success("Password reset email sent!")}
            className="border-border bg-background text-foreground hover:bg-muted mt-4 rounded-md border px-4 py-2"
          >
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
}
