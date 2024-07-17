/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useEffect} from 'react';
import {getCurrentWeather, getForecast} from './api.ts';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {colors, fonts} from './utils.js';
import {
  HorizontalContainer,
  VerticalContainer,
} from './styled/StyledContainers.js';
import {Image} from 'react-native-svg';
const cityName = 'London';

async function fetchWeather(cityName: string): Promise<ApiResponse> {
  const apiKey = '6be8c28794924ed8a2a184922222905';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [clima, setClima] = useState<ApiResponse | null>(null);

  const backgroundStyle = {
    backgroundColor: colors.pink,
  };

  useEffect(() => {
    getCurrentWeather(cityName).then((data: ApiResponse) => {
      setClima(data);
    });
    // fetchWeather(cityName)
    //   .then(data => {
    //     setClima(data);
    //     console.log(data);
    //   })
    //   .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {clima && (
          <HorizontalContainer>
            <Text style={styles.sectionTitle}>{clima.location.name}</Text>
            {/* <Image source={{uri: `${clima.current.condition.icon}`}} /> */}
            <Text style={styles.sectionTitle}>{clima.current.temp_c}ºC</Text>
            <Text style={styles.sectionTitle}>
              ST {clima.current.feelslike_c}ºC
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
