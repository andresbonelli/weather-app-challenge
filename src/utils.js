import {PermissionsAndroid, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const colors = {
  white: '#fff',
  gray: '#ebf1fa',
  darkGray: '#979797',
  black: '#171717',
  pitchBlack: '#000',
  pink: '#ba91f2',
  darkViolet: '#692cbf',
  lightViolet: '#7f0cf2',
  purple: '#3d0b63',
  lightBlue: '#6BA4EB',
  cyan: '#D2DFFC',
  orange: '#f2b705',
};

export const fonts = {
  Poppins: {
    Light: 'Poppins-Light',
    Regular: 'Poppins-Regular',
    Medium: 'Poppins-Medium',
    Bold: 'Poppins-SemiBold',
    Bolder: 'Poppins-Bold',
  },
};

export const defaultStyles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -999,
  },
  darkTitle: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundStyle: {
    backgroundColor: colors.pink,
  },
});

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );

    if (granted) {
      console.log('Location permission granted');
    } else {
      console.error('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export function geo() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => resolve(info),
      err => reject(err),
    );
  });
}

export const dummyApiResponse = {
  location: {
    name: 'Default Location',
    region: 'Default Region',
    country: 'Default Country',
    lat: 0,
    lon: 0,
    tz_id: 'Default TZ ID',
    localtime_epoch: 0,
    localtime: '00:00',
    // Optional fields left out for brevity
  },
  current: {
    last_updated_epoch: 0,
    last_updated: '1970-01-01T00:00:00+00:00', // Unix epoch timestamp
    temp_c: 0,
    temp_f: 32, // Freezing point of water in Fahrenheit
    is_day: 1, // Assuming it's daytime
    condition: {
      text: 'Clear',
      icon: 'c',
      code: 1000,
    },
    wind_mph: 0,
    wind_kph: 0,
    wind_degree: 0,
    wind_dir: 'N',
    pressure_mb: 1013,
    pressure_in: 30,
    precip_mm: 0,
    precip_in: 0,
    humidity: 50,
    cloud: 0,
    feelslike_c: 0,
    feelslike_f: 32,
    windchill_c: 0,
    windchill_f: 32,
    heatindex_c: 0,
    heatindex_f: 32,
    dewpoint_c: 0,
    dewpoint_f: 32,
    vis_km: 10,
    vis_miles: 6,
    uv: 0,
    gust_mph: 0,
    gust_kph: 0,
    // Additional fields omitted for brevity
  },
};
