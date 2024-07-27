import React, {useState, useEffect} from 'react';
import {colors, geo, requestLocationPermission} from '../utils.js';
import Gradient from '../components/Gradient.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [favorites, setFavorites] = useState<(Location | null)[]>(() => {
    let storedFavorites: Location[] = [];
    try {
      AsyncStorage.getItem('favorites').then(data => {
        if (data) {
          console.log('[SUCCESS] - Loaded favorites initial state from local');
          console.log(JSON.parse(data));
          return JSON.parse(data);
        } else {
          console.log('[WARN] - favorites initial state empty');
        }
      });
    } catch (error) {
      console.warn(error);
    }
    return storedFavorites;
  });

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  useEffect(() => {
    getCurrentWeatherFromLocation(currentLocation).then((data: ApiResponse) => {
      setCurrentWeather(data);
      setCurrentLocation(data.location);
    });
    getOtherCities(favorites).then(cities => setFavoriteCities(cities));
  }, []);

  useEffect(() => {
    getOtherCities(favorites).then(cities => setFavoriteCities(cities));
    storeFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    setIsFavorite(favorites.includes(currentLocation));
  }, [currentLocation]);

  function handleSearchPress(location: Location) {
    setCurrentLocation(location);
  }

  async function storeFavorites(favorites: (Location | null)[]) {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn(error);
    }
  }

  async function loadFavorites() {
    try {
      const dataFromStorage = await AsyncStorage.getItem('favorites');
      if (dataFromStorage) {
        return JSON.parse(dataFromStorage);
      }
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  function handleAddToFavorites() {
    if (currentLocation) {
      let updatedFavorites: (Location | null)[];
      if (isFavorite) {
        updatedFavorites = favorites.filter(
          favorite => favorite !== currentLocation,
        );
        setIsFavorite(false);
        console.log('removing from favorites: ', currentLocation.name);
      } else {
        updatedFavorites = [...favorites, currentLocation];
        setIsFavorite(true);
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
          favorite={isFavorite}
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
