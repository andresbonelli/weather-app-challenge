/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useEffect} from 'react';
import {
  getCurrentWeatherFromCityName,
  getCurrentWeatherFromGeo,
  getCurrentWeatherFromLocation,
  getForecast,
  searchCity,
} from './api.ts';

import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {colors, fonts, geo, requestLocationPermission} from './utils.js';

import {
  HorizontalContainer,
  VerticalContainer,
  MainContainer,
} from './styled/StyledContainers.js';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentCityName, setCurrenCityName] = useState('');
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ApiResponse | null>(
    null,
  );
  const [searchResult, setSearchResult] = useState<Location[] | []>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const backgroundStyle = {
    backgroundColor: colors.pink,
  };

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
        }
        return;
      });
    });
  }, []);

  // useEffect(() => {
  //   getCurrentWeatherFromCityName(currentCityName).then(
  //     (data: ApiResponse | null) => {
  //       if (data) {
  //         setCurrentWeather(data);
  //       }
  //       return;
  //     },
  //   );
  // }, []);

  useEffect(() => {
    getCurrentWeatherFromLocation(currentLocation).then((data: ApiResponse) => {
      setCurrentWeather(data);
    });
  }, [currentLocation]);

  useEffect(() => {
    if (searchQuery) {
      searchCity(searchQuery)
        .then((data: Location[]) => {
          setSearchResult(data);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TextInput
          placeholder="Buscar por ciudad, país, CP..."
          onChangeText={text => setSearchQuery(text)}></TextInput>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {searchQuery ? (
            <>
              {searchResult.map(location => (
                <Pressable
                  key={location.tz_id}
                  onPress={() => {
                    setCurrentLocation(location);
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Poppins.Bold,
                      fontSize: 24,
                      fontWeight: '200',
                      color: colors.white,
                    }}>
                    {location.name}, {location.region}
                  </Text>
                </Pressable>
              ))}
            </>
          ) : (
            <></>
          )}
        </TouchableWithoutFeedback>
        {currentWeather && (
          <HorizontalContainer>
            <Text style={styles.sectionTitle}>
              {currentWeather.location.name}
            </Text>
            {/* <Image source={{uri: `${clima.current.condition.icon}`}} /> */}
            <Text style={styles.sectionTitle}>
              {currentWeather.current.temp_c}ºC
            </Text>
            <Text style={styles.sectionTitle}>
              ST {currentWeather.current.feelslike_c}ºC
            </Text>
          </HorizontalContainer>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: fonts.Poppins.Bold,
    fontSize: 24,
    fontWeight: '200',
    color: colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
