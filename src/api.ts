import axios from 'axios';

const apiKey = '6be8c28794924ed8a2a184922222905';
const baseUrl = 'http://api.weatherapi.com/v1/';

export async function getCurrentWeather(city: string): Promise<ApiResponse> {
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
    console.error('Failed to fetch current weather data:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

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

export async function searchCity(query: string): Promise<Location> {
  try {
    const response = await axios.get(baseUrl + '/search.json', {
      params: {
        key: apiKey,
        city: query,
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
