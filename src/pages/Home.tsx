import React, {useState, useEffect} from 'react';
import {colors, fonts, geo, requestLocationPermission} from '../utils.js';
import Gradient from '../components/Gradient.jsx';

import {
  getCurrentWeatherFromGeo,
  getCurrentWeatherFromLocation,
  searchCity,
} from '../api.ts';

import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Image,
  View,
} from 'react-native';

import {
  HorizontalContainer,
  VerticalContainer,
} from '../styled/StyledContainers.js';

import {
  DateLabel,
  BigTempLabel,
  OtherCitiesLabel,
} from '../styled/StyledLabels.js';
import SearchBar from '../components/SearchBar.jsx';

export default function Home({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ApiResponse | null>(
    null,
  );

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  useEffect(() => {
    requestLocationPermission();
    geo().then(info => {
      console.log(info.coords.latitude + ', ' + info.coords.longitude);
      getCurrentWeatherFromGeo({
        lat: info.coords.latitude,
        lon: info.coords.longitude,
      }).then((data: ApiResponse | null) => {
        if (data) {
          console.log(data);
          setCurrentWeather(data);
          Keyboard.dismiss();
        }
        return;
      });
    });
  }, []);

  useEffect(() => {
    getCurrentWeatherFromLocation(currentLocation).then((data: ApiResponse) => {
      setCurrentWeather(data);
    });
  }, [currentLocation]);

  function handleSearchPress(location: Location) {
    setCurrentLocation(location);
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <View style={styles.backgroundGradient}>
        <Gradient
          colorFrom={colors.lightBlue}
          colorTo={colors.darkViolet}
          id="top-card"
          borderRadius={20}
          orientation={'vertical'}
          height={height}
        />
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <DateLabel>{today}</DateLabel>
        <SearchBar
          currentLocation={currentLocation}
          onSearchPress={handleSearchPress}
        />

        {currentWeather && (
          <>
            <BigTempLabel>{currentWeather.current.temp_c}ºC</BigTempLabel>
            <HorizontalContainer>
              <Image
                source={{
                  uri: `https://${currentWeather.current.condition.icon}`,
                }}
                style={{
                  width: 200,
                  height: 200,
                }}
                resizeMode="contain"
              />
              <VerticalContainer style={{alignItems: 'flex-start'}}>
                <Text>Wind</Text>
                <Text>{currentWeather.current.wind_degree}</Text>
                <Text>Humidity</Text>
                <Text>{currentWeather.current.humidity}%</Text>
                <Text
                  onPress={() =>
                    navigation.navigate('details', {location: currentLocation})
                  }>
                  Detailed
                </Text>
                <HorizontalContainer></HorizontalContainer>
              </VerticalContainer>
            </HorizontalContainer>
            <OtherCitiesLabel>Other cities:</OtherCitiesLabel>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -9999,
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
