import React, {useState, useEffect} from 'react';
import {getForecast} from '../api';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, defaultStyles, generateLabels} from '../utils';
import {
  VerticalContainer,
  HorizontalContainer,
  DetailsTopContainer,
  DetailsMidContainer,
  ForecastCardsContainer,
  ParameterCardsContainer,
  DetailsBottomContainer,
} from '../styled/StyledContainers';

import {DetailsTempLabel, WeatherLabel} from '../styled/StyledLabels';
import {ForecastButton, ForecastButtonContainer} from '../styled/StyledButtons';
import Gradient from '../components/Gradient';
import {ArrowLeft} from '../components/Icons';
import ForecastCard from '../components/ForecastCard';
import ParameterCard from '../components/ParameterCard';

export default function Details({navigation, route}: any) {
  const height = Dimensions.get('window').height;
  const currentLocation: Location = route.params.location;
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [displayHour, setDisplayHour] = useState(() => new Date().getHours());

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const currentHour = new Date().getHours();

  const hours: number[] = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

  const {tomorrow, dayAfter} = generateLabels();

  useEffect(() => {
    getForecast(currentLocation).then(forecast => setForecast(forecast));
  }, []);

  function handleChangeDayButtonPress(dayIndex: number) {
    setCurrentDayIndex(dayIndex);
  }

  function handleChangeHourButtonPress(hour: number) {
    setDisplayHour(hour);
  }

  return (
    <SafeAreaView>
      {/* BACKGROUND */}
      <View style={defaultStyles.backgroundGradient}>
        <Gradient
          colorFrom={colors.lightBlue}
          colorTo={colors.darkViolet}
          id="top-card"
          borderRadius={20}
          orientation={'vertical'}
          height={height / 4}
        />
      </View>
      {/* TOP SECTION */}
      <DetailsTopContainer>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 999}}>
          <ArrowLeft color={colors.gray} width={25} height={25} />
        </TouchableOpacity>
        <HorizontalContainer>
          <VerticalContainer style={{alignItems: 'flex-start', paddingTop: 20}}>
            <WeatherLabel style={{color: colors.gray}}>
              {forecast?.location.name}, {forecast?.location.region},
            </WeatherLabel>
            <WeatherLabel style={{color: colors.gray}}>
              {forecast?.location.country}
            </WeatherLabel>
            <DetailsTempLabel>{forecast?.current.temp_c}ºC</DetailsTempLabel>
          </VerticalContainer>
          <VerticalContainer style={{alignItems: 'center', paddingBottom: 20}}>
            <Image
              source={{
                uri: `https://${forecast?.current.condition.icon}`,
              }}
              style={{
                width: 115,
                height: 115,
              }}
              resizeMode="contain"
            />
            <WeatherLabel>{currentTime}</WeatherLabel>
          </VerticalContainer>
        </HorizontalContainer>
      </DetailsTopContainer>
      {/* MID SECTION */}
      <DetailsMidContainer>
        <HorizontalContainer
          style={{justifyContent: 'space-between', paddingTop: 40}}>
          <Text style={defaultStyles.darkTitle}>Forecast:</Text>
          <HorizontalContainer style={{justifyContent: 'space-between'}}>
            <ForecastButtonContainer
              onPress={() => handleChangeDayButtonPress(0)}>
              <ForecastButton>Today</ForecastButton>
            </ForecastButtonContainer>
            <ForecastButtonContainer
              onPress={() => handleChangeDayButtonPress(1)}>
              <ForecastButton>{tomorrow}</ForecastButton>
            </ForecastButtonContainer>
            <ForecastButtonContainer
              onPress={() => handleChangeDayButtonPress(2)}>
              <ForecastButton>{dayAfter}</ForecastButton>
            </ForecastButtonContainer>
          </HorizontalContainer>
        </HorizontalContainer>

        {forecast && (
          <ForecastCardsContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {hours.map(hour => {
              if (currentDayIndex === 0) {
                if (hour >= currentHour) {
                  return (
                    <ForecastCard
                      onCardPress={() => handleChangeHourButtonPress(hour)}
                      dayPhase={hour}
                      forecastHour={
                        forecast?.forecast.forecastday[currentDayIndex].hour[
                          hour
                        ]
                      }
                    />
                  );
                }
              } else {
                return (
                  <ForecastCard
                    onCardPress={() => handleChangeHourButtonPress(hour)}
                    dayPhase={hour}
                    forecastHour={
                      forecast?.forecast.forecastday[currentDayIndex].hour[hour]
                    }
                  />
                );
              }
            })}
          </ForecastCardsContainer>
        )}
      </DetailsMidContainer>
      {/* BOTTOM SECTION */}
      {/* TODO: Expand up section */}
      <DetailsBottomContainer>
        {/* <DetailsBottomToggler></DetailsBottomToggler> */}
        {forecast && (
          <ParameterCardsContainer>
            <ParameterCard
              imgSource={require('../../assets/images/uvindex.png')}
              parameter={'UV Index'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[displayHour].uv} of 10`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/humidity.png')}
              parameter={'Humidity'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[displayHour].humidity}%`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/high-low.png')}
              parameter={'High / Low'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].day.maxtemp_c} / ${forecast?.forecast.forecastday[currentDayIndex].day.mintemp_c}`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/moonphase.png')}
              parameter={'Moon Phase'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].astro.moon_phase}`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/dewpoint.png')}
              parameter={'Dew Point'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[displayHour].dewpoint_c}ºC`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/visibility.png')}
              parameter={'Visibility'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[displayHour].vis_km} km.`}></ParameterCard>
          </ParameterCardsContainer>
        )}
      </DetailsBottomContainer>
    </SafeAreaView>
  );
}
