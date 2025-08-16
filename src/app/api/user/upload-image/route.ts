import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// For demo purposes, we'll use base64 encoding to store images
// In production, you should use a proper storage service like AWS S3, Cloudinary, etc.

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Update user profile with the image
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: base64 },
    });

    return NextResponse.json({ 
      success: true,
      imageUrl: base64,
      message: "Image uploaded successfully" 
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// Note: In a production environment, you should:
// 1. Use a proper cloud storage service (AWS S3, Cloudinary, etc.)
// 2. Resize/optimize images before storage
// 3. Generate unique filenames to prevent conflicts
// 4. Consider implementing image CDN for better performance
// 5. Add virus scanning for uploaded files