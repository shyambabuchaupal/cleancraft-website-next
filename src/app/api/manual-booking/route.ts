import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const strapiUrl = process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;

    if (!strapiUrl || !strapiToken) {
      console.error('Missing Strapi configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Attempting to submit booking data to Strapi...');
    console.log('Strapi URL:', strapiUrl);
    console.log('Using API Token:', strapiToken ? "✅ Token available" : "❌ No token");

    // Determine endpoint based on data (like React.js)
    const hasCustomCity = body.manual_city && body.manual_city.trim();
    const endpoint = hasCustomCity ? "interesting-leads" : "bookings";
    
    console.log(`Data type: ${hasCustomCity ? 'Custom City (Interesting Lead)' : 'Available City (Booking)'}`);
    console.log(`Using endpoint: /${endpoint}`);

    // Prepare payload based on endpoint
    let strapiPayload;
    
    if (hasCustomCity) {
      // For interesting-leads: use manual_city, not city
      strapiPayload = {
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          manual_city: body.manual_city,
          services: body.services
        }
      };
    } else {
      // For bookings: use city
      strapiPayload = {
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          city: body.city || body.manual_city,
          services: body.services
        }
      };
    }

    console.log('Payload:', JSON.stringify(strapiPayload, null, 2));

    // React.js working method: PUBLIC ACCESS (no Authorization header)
    try {
      console.log(`Trying endpoint: ${endpoint} (PUBLIC access)`);
      
      const response = await fetch(`${strapiUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(strapiPayload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully saved to ${endpoint} (PUBLIC):`, result);
        return NextResponse.json({ 
          success: true, 
          id: result.data?.id || `strapi-${Date.now()}`,
          message: `Data saved to ${endpoint} successfully (PUBLIC ACCESS)`,
          endpoint: endpoint,
          type: hasCustomCity ? 'interesting-lead' : 'booking',
          strapiData: result.data
        });
      } else {
        const errorText = await response.text();
        console.log(`❌ ${endpoint} (PUBLIC) failed, status:`, response.status, errorText);
        throw new Error(`Failed to save to ${endpoint}: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} (PUBLIC) error:`, error);
      throw error;
    }

    // If all collections failed
    console.error("All Strapi collection attempts failed");
    return NextResponse.json({ 
      success: false, 
      error: "Failed to save to Strapi" 
    }, { status: 500 });

  } catch (error: unknown) {
    console.error("Error in manual-booking API:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
}
