import axios from 'axios';

const apiKey = '6be8c28794924ed8a2a184922222905';
const baseUrl = 'http://api.weatherapi.com/v1/';

// [GET] - Current weather data from city Name.
export async function getCurrentWeatherFromCityName(
  city: string,
): Promise<ApiResponse | null> {
  if (city !== '') {
    try {
      const response = await axios.get(baseUrl + '/current.json', {
        params: {
          key: apiKey,
          q: city,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error('Failed to fetch from cityName:', error);
      throw error; // Rethrow the error to handle it outside this function if needed
    }
  }
  return null;
}

// [GET] - Current weather data from Location interface.
export async function getCurrentWeatherFromLocation(
  location: Location | null,
): Promise<ApiResponse> {
  try {
    const response = await axios.get(baseUrl + '/current.json', {
      params: {
        key: apiKey,
        q: location ? `${location.lat},${location.lon}` : 'Buenos Aires',
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error('Failed to fetch from Location:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

export async function getCurrentWeatherFromGeo(
  coords: {lat: number; lon: number} | null,
): Promise<ApiResponse> {
  try {
    const response = await axios.get(baseUrl + '/current.json', {
      params: {
        key: apiKey,
        q: coords ? `${coords.lat},${coords.lon}` : '',
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error('Failed to fetch from Location:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

// [GET] - 3 day forecast weather data for specific location (city).
export async function getForecast(city: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(baseUrl + '/forecast.json', {
      params: {
        key: apiKey,
        q: city,
        days: 3,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error('Failed to fetch forectast:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

// [GET] - Search / Autocomplete function.
export async function searchCity(query: string): Promise<Location[]> {
  try {
    const response = await axios.get(baseUrl + '/search.json', {
      params: {
        key: apiKey,
        q: query,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error('Failed search:', error);
    throw error;
  }
}
