import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      "https://api.ipdata.co/?api-key=6aee2f02cd09fb288e6b7e1f824c5f60debac930d5f68326041a1777",
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`IPData API error: ${response.status}`);
    }

    const data = await response.json();

    // Return only the data we need
    return NextResponse.json({
      country_code: data.country_code,
      country_name: data.country_name,
      city: data.city,
      region: data.region_name,
    });

  } catch (error) {
    console.error('Location API error:', error);
    
    // Return default fallback data
    return NextResponse.json({
      country_code: 'AU',
      country_name: 'Australia',
      city: 'Sydney',
      region: 'New South Wales',
    }, { status: 200 }); // Return 200 with fallback data
  }
}
