"use client";
import InputField from '@/components/InputField';
import { Textarea } from '@/components/ui/textarea';
import { profileSchema, ProfileSchemaType } from '@/validations/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const ProfileEdit = () => {
    const methods = useForm<ProfileSchemaType>({
        mode: "all",
        resolver: zodResolver(profileSchema),
    });
    const { register, handleSubmit, reset, setValue } = methods;

    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch('/api/profile');

            if (!response.ok) {
                console.error('Failed to fetch profile:', response.statusText);
                return;
            }

            const data = await response.json();
            reset(data); // Reset the form with fetched data

            // Set initial image preview from fetched data
            if (data.profileImg) {
                setImagePreview(data.profileImg); // Use the server image URL
            }
        };

        fetchProfileData();
    }, [reset]);

    const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
        // Create a new object for submission, ensuring profileImg remains a File or undefined
        const submitData: ProfileSchemaType = {
            ...data,
            profileImg: data.profileImg || (imagePreview ? new File([], imagePreview as string) : undefined),
        };

        console.log("Submitted Data:", submitData);
        // Handle image upload to server here if needed
    };



    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the preview image
            };
            reader.readAsDataURL(file); // Show the local image
            setValue("profileImg", file); // Register the file with RHF
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-xl rounded-lg p-10 w-full">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Edit Your Profile</h2>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto shadow-lg p-4">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center mb-6">
                            <label htmlFor="profilePicture" className="cursor-pointer mb-4">
                                <img
                                    id="profileImagePreview"
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg transform transition-transform duration-300 hover:scale-105"
                                    src={imagePreview as string || "https://via.placeholder.com/150"} // Show preview or placeholder
                                />
                                <input
                                    type="file"
                                    id="profilePicture"
                                    accept="image/*" // Only accept images
                                    {...register("profileImg")} // Register with RHF
                                    className="hidden" // Hide the file input
                                    onChange={handleImageChange} // Handle image change separately
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
                            <label htmlFor="bio" className="block text-gray-700 font-semibold">Bio</label>

                            <Textarea {...register("bio")} placeholder="Tell us about yourself" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 text-black" rows={4} />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default ProfileEdit;
