import {PermissionsAndroid, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// STYLING
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
  selected: {
    fontWeight: '700',
    fontFamily: fonts.Poppins.Bolder,
  },
  backgroundStyle: {
    backgroundColor: colors.pink,
  },
});

// GEOLOCATION
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

// DYNAMIC WEEKDAY LABELS
export function generateLabels(timezone) {
  // Format the current date to get the weekday string
  const todayWeekday = new Date().toLocaleDateString('en-US', {
    timeZone: timezone,
    weekday: 'short',
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = days.indexOf(todayWeekday);

  // Calculate indices 0-6 for tomorrow and the day after
  const tomorrowIndex = (todayIndex + 1) % 7;
  const dayAfterIndex = (todayIndex + 2) % 7;

  // Get labels using the adjusted indices
  const tomorrow = days[tomorrowIndex];
  const dayAfter = days[dayAfterIndex];

  return {tomorrow, dayAfter};
}
