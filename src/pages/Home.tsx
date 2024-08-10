import React, {useState, useEffect} from 'react';
import {colors, geo, requestLocationPermission} from '../utils.js';
import Gradient from '../components/Gradient.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCurrentWeatherFromGeo,
  getCurrentWeatherFromLocation,
  getOtherCities,
} from '../api.ts';

import {
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Image,
  View,
  Pressable,
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
import SearchBar from '../components/SearchBar.tsx';
import {DetailsIcon} from '../components/Icons.js';
import OtherCityCard from '../components/OtherCityCard.tsx';
import {ClearButton, ClearButtonContainer} from '../styled/StyledButtons.js';

export default function Home({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ApiResponse | null>(
    null,
  );
  const [favoriteCities, setFavoriteCities] = useState<ApiResponse[]>([]);
  const [favorites, setFavorites] = useState<Location[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const height = Dimensions.get('window').height;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  // ********* Effects *********

  // On first load: fetch hard coded initial Location "Buenos Aires"
  useEffect(() => {
    getCurrentWeatherFromLocation(currentLocation).then((data: ApiResponse) => {
      setCurrentWeather(data);
      setCurrentLocation(data.location);
    });
    loadFavorites().then(savedFavs => setFavorites(savedFavs));
    getOtherCities(favorites).then(cities => setFavoriteCities(cities));
  }, []);

  // On Location state change:
  // - Check if Location is already in favorites or not.
  // - Retrieve weather data from api using Geo coords.
  useEffect(() => {
    if (currentLocation) {
      setIsFavorite(
        favorites.some(
          favorite =>
            favorite.lon.toString() + favorite.lat.toString() ===
            currentLocation?.lon.toString() + currentLocation?.lat.toString(),
        ),
      );
    }
    getCurrentWeatherFromLocation(currentLocation).then((data: ApiResponse) => {
      setCurrentWeather(data);
    });
  }, [currentLocation]);

  // On Favorites[] state change:
  // - Retrieve multiple weather data from api using Geo coords.
  // - Store favorites array in AsyncStorage
  useEffect(() => {
    getOtherCities(favorites).then(cities => setFavoriteCities(cities));
    storeFavorites(favorites);
  }, [favorites]);

  // ********* Functions *********

  // Set Location retrieved from api search city endpoint.
  function handleSearchPress(location: Location) {
    console.log(location.name, location.id);
    setCurrentLocation(location);
  }

  // Save/Load Favorites[] on AsyncStorage (array of Location objects, NOT actual weather data)
  async function storeFavorites(favorites: Location[]): Promise<void> {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn(error);
    }
  }

  async function loadFavorites(): Promise<Location[]> {
    try {
      const dataFromStorage = await AsyncStorage.getItem('favorites');
      if (dataFromStorage) {
        return JSON.parse(dataFromStorage);
      }
    } catch (error) {
      console.warn(error);
      return [];
    }
    return [];
  }

  // Add/Remove Location on Favorites[] state (Will trigger useEffect).
  function handleAddToFavorites(): void {
    let updatedFavorites: Location[];
    if (currentLocation) {
      if (isFavorite) {
        updatedFavorites = favorites.filter(
          favorite =>
            favorite.lon.toString() + favorite.lat.toString() !==
            currentLocation.lon.toString() + currentLocation.lat.toString(),
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

  // Set current weather data from Favorites[] (NOT api call!)
  function handleRetrieveFromFavorites(city: ApiResponse): void {
    setCurrentLocation(city.location);
    setCurrentWeather(city);
  }

  function handleClearFavorites(): void {
    setFavorites([]);
    setIsFavorite(false);
  }

  return (
    <SafeAreaView style={defaultStyles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={defaultStyles.backgroundStyle.backgroundColor}
      />
      {/* BACKGROUND */}
      <View style={defaultStyles.backgroundGradient}>
        <Gradient
          colorFrom={colors.lightBlue}
          colorTo={colors.darkViolet}
          id="top-card"
          borderRadius={20}
          height={height}
        />
      </View>
      {/* END BACKGROUND */}
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* TOP SECTION: Search Bar */}
        <DateLabel>{today}</DateLabel>
        <SearchBar
          currentLocation={currentLocation}
          onSearchPress={handleSearchPress}
          onAddToFavorites={handleAddToFavorites}
          favorite={isFavorite}
        />
        {/* END TOP SECTION */}

        {/* MID SECTION: Current Weather overview */}
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
              <VerticalContainer
                style={{alignItems: 'flex-start', marginBottom: 10}}>
                <WeatherLabel>Rain</WeatherLabel>
                <WeatherData>
                  {currentWeather.current.precip_mm}{' '}
                  <WeatherLabel style={{color: colors.gray}}>mm</WeatherLabel>{' '}
                </WeatherData>
                <WeatherLabel>Wind</WeatherLabel>
                <WeatherData>
                  {currentWeather.current.wind_kph}{' '}
                  <WeatherLabel style={{color: colors.gray}}>km/h</WeatherLabel>
                </WeatherData>
                <WeatherLabel>Humidity</WeatherLabel>
                <WeatherData>{currentWeather.current.humidity}%</WeatherData>
                <Pressable
                  onPress={() =>
                    navigation.navigate('details', {
                      location: currentLocation,
                    })
                  }>
                  <HorizontalContainer>
                    <WeatherLabel>Detailed</WeatherLabel>
                    <DetailsIcon
                      color={colors.lightBlue}
                      width={24}
                      height={24}
                    />
                  </HorizontalContainer>
                </Pressable>
              </VerticalContainer>
            </HorizontalContainer>
          </>
        )}
        {/* END MID SECTION */}

        {/* BOTTOM SECTION: Favorites */}
        <HorizontalContainer
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 25,
          }}>
          <OtherCitiesHeading>Favorites:</OtherCitiesHeading>
          <ClearButtonContainer onPress={() => handleClearFavorites()}>
            <ClearButton>Clear</ClearButton>
          </ClearButtonContainer>
        </HorizontalContainer>

        {favoriteCities.length > 0 && (
          <OtherCitiesContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {favoriteCities.map(city => {
              if (city) {
                return (
                  <OtherCityCard
                    key={
                      city.location.lat.toString() +
                      city.location.lon.toString()
                    }
                    weather={city}
                    onRetrieve={() => handleRetrieveFromFavorites(city)}
                  />
                );
              }
            })}
          </OtherCitiesContainer>
        )}
        {/* END BOTTOM SECTION */}
      </ScrollView>
    </SafeAreaView>
  );
}
