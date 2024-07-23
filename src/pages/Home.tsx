import React, {useState, useEffect} from 'react';
import {colors, geo, requestLocationPermission} from '../utils.js';
import Gradient from '../components/Gradient.jsx';

import {
  getCurrentWeatherFromGeo,
  getCurrentWeatherFromLocation,
} from '../api.ts';

import {
  Dimensions,
  Keyboard,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Image,
  View,
} from 'react-native';

import {
  HorizontalContainer,
  OtherCitiesContainer,
  VerticalContainer,
} from '../styled/StyledContainers.js';

import {
  DateLabel,
  BigTempLabel,
  OtherCitiesHeading,
  WeatherData,
  WeatherLabel,
} from '../styled/StyledLabels.js';
import {defaultStyles} from '../utils.js';
import SearchBar from '../components/SearchBar.jsx';
import {DetailsIcon} from '../components/Icons.js';
import OtherCityCard from '../components/OtherCityCard.jsx';

export default function Home({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ApiResponse | null>(
    null,
  );
  const [otherCities, setOtherCities] = useState<ApiResponse[]>([]);

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
      }).then((data: ApiResponse) => {
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
    <SafeAreaView style={defaultStyles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={defaultStyles.backgroundStyle.backgroundColor}
      />
      {/* Background */}
      <View style={defaultStyles.backgroundGradient}>
        <Gradient
          colorFrom={colors.lightBlue}
          colorTo={colors.darkViolet}
          id="top-card"
          borderRadius={20}
          orientation={'vertical'}
          height={height}
        />
      </View>
      {/* End background */}
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <DateLabel>{today}</DateLabel>
        <SearchBar
          currentLocation={currentLocation}
          onSearchPress={handleSearchPress}
        />

        {currentWeather && (
          <>
            <BigTempLabel>{currentWeather.current.temp_c}ºC</BigTempLabel>
            <HorizontalContainer style={{justifyContent: 'center'}}>
              <Image
                source={{
                  uri: `https://${currentWeather.current.condition.icon}`,
                }}
                style={{
                  width: 170,
                  height: 170,
                  marginRight: 35,
                }}
                resizeMode="contain"
              />
              <VerticalContainer style={{alignItems: 'flex-start'}}>
                <WeatherLabel>Wind</WeatherLabel>
                <WeatherData>{currentWeather.current.wind_degree}</WeatherData>
                <WeatherLabel>Humidity</WeatherLabel>
                <WeatherData>{currentWeather.current.humidity}%</WeatherData>
                <HorizontalContainer>
                  <WeatherLabel
                    onPress={() =>
                      navigation.navigate('details', {
                        location: currentLocation,
                      })
                    }>
                    Detailed
                  </WeatherLabel>
                  <DetailsIcon
                    color={colors.lightBlue}
                    width={24}
                    height={24}
                  />
                </HorizontalContainer>
              </VerticalContainer>
            </HorizontalContainer>
          </>
        )}
        <OtherCitiesHeading>Other cities:</OtherCitiesHeading>
        {currentWeather && (
          <OtherCitiesContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            <OtherCityCard weather={currentWeather} />
            <OtherCityCard weather={currentWeather} />
            <OtherCityCard weather={currentWeather} />
            <OtherCityCard weather={currentWeather} />
            <OtherCityCard weather={currentWeather} />
          </OtherCitiesContainer>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
