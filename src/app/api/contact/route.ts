import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact form submission:", body);

    const strapiUrl = process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;
    
    if (!strapiUrl || !strapiToken) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Generic contact form payload
    const payload = {
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: `City: ${body.city || body.manual_city || 'Not specified'}\nServices: ${body.services}\nType: Booking Request`,
        subject: "Booking Request",
      }
    };

    console.log("Submitting to contact form endpoint");

    // Try multiple contact collection names
    const contactEndpoints = ["Contact", "contacts", "contact", "Contacts"];
    
    let res;
    let lastError;

    for (const endpoint of contactEndpoints) {
      try {
        console.log("Trying contact endpoint:", endpoint);
        
        res = await fetch(`${strapiUrl}/api/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
          },
          body: JSON.stringify(payload),
        });

        console.log("Contact endpoint response:", res.status, "for", endpoint);

        if (res.ok) {
          console.log("Success with contact endpoint:", endpoint);
          break;
        }
      } catch (fetchError) {
        console.log("Error with contact endpoint:", endpoint, fetchError);
        lastError = fetchError;
      }
    }

    if (!res || !res.ok) {
      const errorText = res ? await res.text() : "No contact endpoint found";
      console.error("All contact endpoints failed:", res?.status, errorText);
      throw new Error(`Contact submission failed: ${res?.status || 'No response'}`);
    }

    const result = await res.json();
    console.log("Contact submitted successfully:", result.data?.id);

    return NextResponse.json({ 
      success: true, 
      id: result.data?.id,
      message: "Contact submitted successfully" 
    });

  } catch (error: any) {
    console.error("Error submitting contact:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit contact" },
      { status: 500 }
    );
  }
}
