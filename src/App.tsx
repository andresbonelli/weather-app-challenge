/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyledContainer} from './styled/StyledContainer';
import {Image} from 'react-native-svg';
const cityName = 'Buenos Aires';

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
    backgroundColor: '#ba91f2',
  };

  useEffect(() => {
    fetchWeather(cityName)
      .then(data => {
        setClima(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
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
        <StyledContainer>
          {clima && (
            <View>
              <Text style={styles.sectionTitle}>{clima.location.name}</Text>
              {/* <Image source={{uri: `${clima.current.condition.icon}`}} /> */}
              <Text style={styles.sectionTitle}>{clima.current.temp_c}ºC</Text>
              <Text style={styles.sectionTitle}>
                ST {clima.current.feelslike_c}ºC
              </Text>
            </View>
          )}
        </StyledContainer>
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
    color: 'white',
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
