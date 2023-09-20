// import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { LocationResponse } from '@/lib/api.types';

export async function GET(request: Request) {
  const requestHeaders = new Headers(request.headers);
  //   const location = request.cookies.get('geo-consent');
  const latitudeHeader = requestHeaders.get('latitude');
  const longitudeHeader = requestHeaders.get('longitude');
  //TODO: Discover location based on an IP address

  try {
    // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitudeHeader}&lon=${longitudeHeader}&format=json`);
    const response = await fetch(`https://x.y/api/geo-location/coordinates`);
    const data: LocationResponse = await response.json();
    let preparedData = {} as LocationResponse,
      preparedInfo = {};
    if (typeof data === 'object' && data !== null && 'address' in data) {
      preparedData = { ...data };
      preparedInfo = { code: null, message: null };
    } else if (typeof data === 'object' && data !== null && 'error' in data) {
      preparedData = {
        place_id: null,
        licence: null,
        osm_type: null,
        osm_id: null,
        lat: null,
        lon: null,
        class: null,
        type: null,
        place_rank: null,
        importance: null,
        addresstype: null,
        name: null,
        display_name: null,
        address: {
          amenity: null,
          house_number: null,
          road: null,
          suburb: null,
          city: null,
          county: null,
          'ISO3166-2-lvl6': null,
          state: null,
          'ISO3166-2-lvl4': null,
          postcode: null,
          country: null,
          country_code: null,
          town: null,
          state_district: null,
        },
        boundingbox: null,
      };
      preparedInfo = { ...data.error };
    }
    return NextResponse.json({
      data: preparedData,
      info: { ...preparedInfo, status: response.status, statusText: response.statusText, ok: response.ok },
    });
  } catch (error) {
    console.error('Error converting coordinates');
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    // throw NextResponse.error();
    throw error;
  }
}
