import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const colors = {
  white: '#fff',
  gray: '#cfcfcf',
  black: '#171717',
  pitchBlack: '#000',
  pink: '#ba91f2',
  darkViolet: '#692cbf',
  lightViolet: '#7f0cf2',
  purple: '#3d0b63',
  lightBlue: '#667be0',
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

export function coordsToString(lat, lon) {
  return String(lat) + ',' + String(lon);
}
