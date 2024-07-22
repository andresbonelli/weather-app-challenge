import React, {useState, useEffect} from 'react';
import {
  getCurrentWeatherFromGeo,
  getCurrentWeatherFromLocation,
  searchCity,
} from '../api.ts';

import {
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
} from 'react-native';

import {colors, fonts, geo, requestLocationPermission} from '../utils.js';

import {
  HorizontalContainer,
  VerticalContainer,
} from '../styled/StyledContainers.js';

export default function Home({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ApiResponse | null>(
    null,
  );
  const [searchResult, setSearchResult] = useState<Location[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
          setSearchResult([]);
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
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <TextInput
          placeholder={
            currentLocation
              ? `${currentLocation.name}, ${currentLocation.country}`
              : 'Buscar por ciudad...'
          }
          onChangeText={text => setSearchQuery(text)}></TextInput>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {searchQuery ? (
            <>
              {searchResult.map(location => (
                <Pressable
                  key={location.id}
                  onPress={() => {
                    setCurrentLocation(location);
                    setSearchResult([]);
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
          <VerticalContainer style={styles.backgroundStyle}>
            <Text style={styles.sectionTitle}>
              {currentWeather.current.temp_c}ºC
            </Text>

            <Image
              source={{
                uri: `https://${currentWeather.current.condition.icon}`,
              }}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />

            <Text style={styles.sectionDescription}>Wind</Text>
            <Text style={styles.sectionDescription}>
              {currentWeather.current.wind_degree}
            </Text>
            <Text style={styles.sectionDescription}>Humidity</Text>
            <Text style={styles.sectionDescription}>
              {currentWeather.current.humidity}%
            </Text>
            <Text
              style={styles.sectionDescription}
              onPress={() =>
                navigation.navigate('details', {location: currentLocation})
              }>
              Detailed
            </Text>
            <Text style={styles.sectionDescription}>Other cities</Text>
            <HorizontalContainer></HorizontalContainer>
          </VerticalContainer>
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
