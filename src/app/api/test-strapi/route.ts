import { NextResponse } from "next/server";

export async function GET() {
  try {
    const strapiUrl = process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;
    
    console.log("Testing Strapi connection...");
    console.log("Strapi URL:", strapiUrl);
    console.log("Token exists:", !!strapiToken);

    if (!strapiUrl || !strapiToken) {
      return NextResponse.json({
        error: "Missing environment variables",
        strapiUrl: !!strapiUrl,
        strapiToken: !!strapiToken
      }, { status: 500 });
    }

    // Test connection with a simple API call
    const res = await fetch(`${strapiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
    });

    console.log("Strapi connection test status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Strapi connection error:", errorText);
      return NextResponse.json({
        error: "Strapi connection failed",
        status: res.status,
        details: errorText
      }, { status: 500 });
    }

    const userData = await res.json();
    console.log("Strapi connection successful, user:", userData.username);

    return NextResponse.json({
      success: true,
      message: "Strapi connection working",
      user: userData.username
    });

  } catch (error: any) {
    console.error("Error testing Strapi connection:", error);
    return NextResponse.json({
      error: error.message || "Connection test failed"
    }, { status: 500 });
  }
}
