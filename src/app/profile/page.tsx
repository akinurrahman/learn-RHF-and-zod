"use client";
import React, { useEffect, useState } from "react";
import ProfileEdit from "@/components/ProfileEdit";
import { ProfileSchemaType } from "@/validations/profileSchema";

const ProfileParent = () => {
    const [profile, setProfile] = useState<ProfileSchemaType | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile data from the API when the component mounts
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch("/api/profile");

                if (!response.ok) {
                    console.error("Failed to fetch profile:", response.statusText);
                    return;
                }

                const data = await response.json();
                setProfile(data); // Set profile data if it exists
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false); // Stop loading regardless of success/failure
            }
        };

        fetchProfileData();
    }, []);

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render ProfileEdit form with profile data (if available) or without for a new profile
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
            <ProfileEdit user={profile} /> {/* Passing user data to ProfileEdit */}
        </div>
    );
};

export default ProfileParent;
