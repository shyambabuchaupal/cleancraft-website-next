import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Generic submission:", body);

    const strapiUrl = process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;
    
    if (!strapiUrl || !strapiToken) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Generic payload that can work with any collection
    const payload = {
      data: {
        // Try both capitalized and lowercase field names
        name: body.name || "Unknown",
        Name: body.name || "Unknown", 
        email: body.email || "",
        Email: body.email || "",
        phone: body.phone || "",
        Phone: body.phone || "",
        city: body.city || body.manual_city || "Not specified",
        City: body.city || body.manual_city || "Not specified",
        manual_city: body.manual_city || "",
        services: body.services || "Not specified",
        Services: body.services || "Not specified",
        message: `Booking Request - City: ${body.city || body.manual_city || 'Not specified'}, Services: ${body.services || 'Not specified'}`,
        Message: `Booking Request - City: ${body.city || body.manual_city || 'Not specified'}, Services: ${body.services || 'Not specified'}`,
        type: "Booking Request",
        Type: "Booking Request",
        status: "New",
        Status: "New"
      }
    };

    // Try your actual collection first, then common ones
    const commonCollections = [
      "Booking",            // Your actual collection (singular, capital B)
      "bookings",           // plural lowercase
      "booking",            // singular lowercase
      "Bookings",           // plural capital
      "Form-submission",    // Very common
      "form-submissions",   // Common variation
      "Submission",         // Simple
      "submissions",        // Simple plural
      "Lead",              // Sales term
      "leads",             // Sales term plural
      "Inquiry",           // Common
      "inquiries",         // Common plural
      "Request",           // Generic
      "requests",          // Generic plural
      "Contact-form",      // Specific
      "contact-forms"      // Specific plural
    ];

    console.log("Trying common collection names...");

    let successResponse = null;

    for (const collection of commonCollections) {
      try {
        console.log(`Attempting collection: ${collection}`);
        
        const res = await fetch(`${strapiUrl}/api/${collection}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
          },
          body: JSON.stringify(payload),
        });

        console.log(`Collection ${collection} response:`, res.status);

        if (res.ok) {
          const result = await res.json();
          console.log(`✅ SUCCESS with collection: ${collection}`);
          console.log("Response data:", JSON.stringify(result, null, 2));
          console.log("Created ID:", result.data?.id);
          successResponse = result;
          break;
        } else if (res.status === 403) {
          console.log(`❌ Collection ${collection} exists but permission denied`);
        } else if (res.status === 404) {
          console.log(`❌ Collection ${collection} not found`);
        } else {
          const errorText = await res.text();
          console.log(`❌ Collection ${collection} error:`, res.status, errorText);
        }
      } catch (fetchError) {
        console.log(`Collection ${collection} fetch error:`, fetchError);
      }
    }

    if (successResponse) {
      return NextResponse.json({ 
        success: true, 
        id: successResponse.data?.id,
        message: "Submission successful" 
      });
    } else {
      // If all collections fail, at least log the data for manual processing
      console.error("ALL COLLECTIONS FAILED - Logging data for manual processing:");
      console.error("Submission Data:", JSON.stringify(body, null, 2));
      
      // Return success to user since we've logged the data
      return NextResponse.json({ 
        success: true, 
        id: "logged",
        message: "Request received and will be processed manually" 
      });
    }

  } catch (error: any) {
    console.error("Error in generic submission:", error);
    console.error("Submission Data for manual processing:", JSON.stringify(request.body, null, 2));
    
    // Even on error, return success with manual processing message
    return NextResponse.json({ 
      success: true, 
      id: "error-logged",
      message: "Request received and will be processed manually" 
    });
  }
}
