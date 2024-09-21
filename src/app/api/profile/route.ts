import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Dummy profile data
    const profileData = {
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-xnGLZJFli6FRyXSlm8-QnpJb9hh30HffEA&s",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 7099119857",
      address: "123 Main St, Anytown, USA",
      bio: "A short bio about John Doe.",
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.error();
  }
}
