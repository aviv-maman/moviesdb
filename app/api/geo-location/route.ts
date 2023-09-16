// import { cookies } from 'next/headers';
import type { LocationResponse } from '@/lib/api.types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestHeaders = new Headers(request.headers);
  //   const location = request.cookies.get('geo-consent');
  const latitudeHeader = requestHeaders.get('latitude');
  const longitudeHeader = requestHeaders.get('longitude');
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitudeHeader}&lon=${longitudeHeader}&format=jsonv2`);
    const data: LocationResponse = await response.json();
    return NextResponse.json({
      //   data: { country: data.address.country, country_code: data.address.country_code, state: data.address.state, d: data.address['ISO3166-2-lvl4'] },
      data,
      info: { headers: response.headers, status: response.status, statusText: response.statusText, ok: response.ok },
    });
  } catch (error) {
    console.error('Error converting coordinates:', error);
  }
}
