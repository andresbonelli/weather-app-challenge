import React, {useState, useEffect} from 'react';
import {colors, geo, requestLocationPermission} from '../utils.js';
import Gradient from '../components/Gradient.jsx';

import {
  getCurrentWeatherFromGeo,
  getCurrentWeatherFromLocation,
  getOtherCities,
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
import {defaultStyles, dummyApiResponse} from '../utils.js';
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
  const [favoriteCities, setFavoriteCities] = useState<(ApiResponse | null)[]>(
    [],
  );
  const [favorites, setFavorites] = useState<(Location | null)[]>([]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  // useEffect(() => {
  //   requestLocationPermission();
  //   geo().then(info => {
  //     console.log(info.coords.latitude + ', ' + info.coords.longitude);
  //     getCurrentWeatherFromGeo({
  //       lat: info.coords.latitude,
  //       lon: info.coords.longitude,
  //     }).then((data: ApiResponse) => {
  //       if (data) {
  //         console.log(data);
  //         setCurrentWeather(data);
  //         Keyboard.dismiss();
  //       }
  //       return;
  //     });
  //   });
  // }, []);

  useEffect(() => {
    getCurrentWeatherFromLocation(currentLocation).then((data: ApiResponse) => {
      setCurrentWeather(data);
      setCurrentLocation(data.location);
    });
  }, []);

  useEffect(() => {
    getOtherCities(favorites).then(cities => setFavoriteCities(cities));
  }, [favorites]);

  function handleSearchPress(location: Location) {
    setCurrentLocation(location);
  }

  function handleAddToFavorites() {
    if (currentLocation) {
      const isAlreadyFavorite = favorites.includes(currentLocation);
      let updatedFavorites: (Location | null)[];
      if (isAlreadyFavorite) {
        updatedFavorites = favorites.filter(
          favorite => favorite !== currentLocation,
        );
        console.log('removing from favorites: ', currentLocation.name);
      } else {
        updatedFavorites = [...favorites, currentLocation];
        console.log('Adding to favorites: ', currentLocation.name);
      }
      setFavorites(updatedFavorites);
    }
  }

  function handleRetrieveFromFavorites(city: ApiResponse) {
    setCurrentLocation(city.location);
    setCurrentWeather(city);
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
        {/* Top Section: Search Bar */}
        <DateLabel>{today}</DateLabel>
        <SearchBar
          currentLocation={currentLocation}
          onSearchPress={handleSearchPress}
          onAddToFavorites={handleAddToFavorites}
          isFavorite={favorites.includes(currentLocation)}
        />
        {/* End Top Section */}

        {/* Mid Section: Current Weather overview */}
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
        {/* End Mid Section */}

        {/* Bottom Section: Favorites */}
        <OtherCitiesHeading>Favorites:</OtherCitiesHeading>

        {favoriteCities.length > 0 && (
          <OtherCitiesContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {favoriteCities.map(city => {
              if (city) {
                return (
                  <OtherCityCard
                    key={city.location.name}
                    weather={city}
                    onRetrieve={() => handleRetrieveFromFavorites(city)}
                  />
                );
              }
            })}
          </OtherCitiesContainer>
        )}
        {/* End Bottom Section */}
      </ScrollView>
    </SafeAreaView>
  );
}
