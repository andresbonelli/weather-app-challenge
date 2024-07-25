import React, {useState, useEffect} from 'react';
import {getForecast} from '../api';
import {colors, defaultStyles} from '../utils';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import {
  DetailsBottomToggler,
  ForecastButton,
  ForecastButtonContainer,
} from '../styled/StyledButtons';
import Gradient from '../components/Gradient';
import {ArrowLeft} from '../components/Icons';
import ForecastCard from '../components/ForecastCard';
import ParameterCard from '../components/ParameterCard';

export default function Details({navigation, route}: any) {
  const height = Dimensions.get('window').height;
  const currentLocation: Location = route.params.location;
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentHourIndex, setCurrentHourIndex] = useState(8);

  const hour = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  useEffect(() => {
    getForecast(currentLocation).then(forecast => setForecast(forecast));
  }, []);

  function handleChangeDayButtonPress() {
    setCurrentDayIndex(currentState => (currentState === 0 ? 1 : 0));
  }

  function handleChangeHourButtonPress(hour: number) {
    setCurrentHourIndex(hour);
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
            <WeatherLabel>{hour}</WeatherLabel>
          </VerticalContainer>
        </HorizontalContainer>
      </DetailsTopContainer>
      {/* MID SECTION */}
      <DetailsMidContainer>
        <HorizontalContainer
          style={{justifyContent: 'space-between', paddingTop: 40}}>
          <Text style={defaultStyles.darkTitle}>Forecast:</Text>
          <ForecastButtonContainer onPress={handleChangeDayButtonPress}>
            <ForecastButton>
              {currentDayIndex === 0 ? 'Tomorrow' : 'Today'}
            </ForecastButton>
          </ForecastButtonContainer>
        </HorizontalContainer>

        {forecast && (
          <ForecastCardsContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            <ForecastCard
              onCardPress={() => handleChangeHourButtonPress(8)}
              dayPhase={'Morning'}
              forecastHour={
                forecast?.forecast.forecastday[currentDayIndex].hour[8]
              }></ForecastCard>
            <ForecastCard
              onCardPress={() => handleChangeHourButtonPress(14)}
              dayPhase={'Afternoon'}
              forecastHour={
                forecast?.forecast.forecastday[currentDayIndex].hour[14]
              }></ForecastCard>
            <ForecastCard
              onCardPress={() => handleChangeHourButtonPress(18)}
              dayPhase={'Evening'}
              forecastHour={
                forecast?.forecast.forecastday[currentDayIndex].hour[18]
              }></ForecastCard>
            <ForecastCard
              onCardPress={() => handleChangeHourButtonPress(22)}
              dayPhase={'Night'}
              forecastHour={
                forecast?.forecast.forecastday[currentDayIndex].hour[22]
              }></ForecastCard>
          </ForecastCardsContainer>
        )}
      </DetailsMidContainer>
      {/* BOTTOM SECTION */}
      {/* TODO: Expand up section */}
      <DetailsBottomContainer>
        <DetailsBottomToggler></DetailsBottomToggler>
        {forecast && (
          <ParameterCardsContainer>
            <ParameterCard
              imgSource={''}
              parameter={'UV Index'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[currentHourIndex].uv} of 10`}></ParameterCard>
            <ParameterCard
              imgSource={''}
              parameter={'Humidity'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[currentHourIndex].humidity}%`}></ParameterCard>
            <ParameterCard
              imgSource={''}
              parameter={'High / Low'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].day.maxtemp_c} / ${forecast?.forecast.forecastday[currentDayIndex].day.mintemp_c}`}></ParameterCard>
            <ParameterCard
              imgSource={''}
              parameter={'Moon Phase'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].astro.moon_phase}`}></ParameterCard>
            <ParameterCard
              imgSource={''}
              parameter={'Dew Point'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[currentHourIndex].dewpoint_c}ºC`}></ParameterCard>
            <ParameterCard
              imgSource={''}
              parameter={'Visibility'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[currentHourIndex].vis_km} km.`}></ParameterCard>
          </ParameterCardsContainer>
        )}
      </DetailsBottomContainer>
    </SafeAreaView>
  );
}
