"use client";
import InputField from "@/components/InputField";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema, ProfileSchemaType } from "@/validations/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// Props: If `user` is passed, it's an existing profile, otherwise it's creating a new profile.
interface ProfileEditProps {
    user?: ProfileSchemaType | null;
}

const ProfileEdit = ({ user }: ProfileEditProps) => {
    // useForm logic with profile schema validation
    const methods = useForm<ProfileSchemaType>({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: zodResolver(profileSchema),
        defaultValues: user || {}, // Use the existing profile data if available
    });

    const { register, handleSubmit, setValue } = methods;

    // Handle form submission (either update existing profile or create a new one)
    const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
        const method = user ? "PATCH" : "POST";
        const url = user ? `/api/profile/id` : "/api/profile";

        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("Profile saved successfully.");
        } else {
            console.error("Failed to save profile:", response.statusText);
        }
    };

    // Handle image upload and preview
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the preview image
                setValue("profileImg", file); // Register the file with RHF
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-xl rounded-lg p-10 w-full">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    {user ? "Edit Your Profile" : "Create Your Profile"}
                </h2>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto shadow-lg p-4">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center mb-6">
                            <label htmlFor="profilePicture" className="cursor-pointer mb-4">
                                <img
                                    id="profileImagePreview"
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg transform transition-transform duration-300 hover:scale-105"
                                    src={user?.profileImg || "https://via.placeholder.com/150"} // Show preview or placeholder
                                />
                                <input
                                    type="file"
                                    id="profilePicture"
                                    accept="image/*"
                                    {...register("profileImg")}
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        {/* Input Fields */}
                        <InputField label="Full Name" type="text" placeholder="Input full name" name="fullName" />
                        <InputField label="Email" type="email" placeholder="Input email" name="email" />
                        <InputField label="Phone No" type="tel" placeholder="Input Phone No" name="phone" />
                        <InputField label="Address" type="text" placeholder="Input Address" name="address" />

                        {/* Bio Field */}
                        <div>
                            <label htmlFor="bio" className="block text-gray-700 font-semibold">
                                Bio
                            </label>
                            <Textarea
                                {...register("bio")}
                                placeholder="Tell us about yourself"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 text-black"
                                rows={4}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
                            >
                                {user ? "Update Profile" : "Create Profile"}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default ProfileEdit;
