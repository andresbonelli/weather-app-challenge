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
import Gradient from '../components/Gradient.tsx';
import {ArrowLeft} from '../components/Icons';
import ForecastCard from '../components/ForecastCard.tsx';
import ParameterCard from '../components/ParameterCard.tsx';

export default function Details({navigation, route}: any) {
  const height = Dimensions.get('window').height;
  const currentLocation: Location = route.params.location;
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [displayHour, setDisplayHour] = useState<number>(() => {
    if (forecast) {
      const localHour: string = forecast.location.localtime.split(' ')[1];
      return parseInt(localHour.split(':')[0], 10);
    } else {
      return new Date().getHours();
    }
  });

  const hours: number[] = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

  // Strings representing day of the week
  const {tomorrow, dayAfter} = generateLabels(forecast?.location.tz_id);

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
          height={height / 4}
        />
      </View>
      {/* END BACKGROUND */}

      {/* TOP SECTION: Current weather brief */}
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
            <HorizontalContainer style={{alignItems: 'flex-end'}}>
              <DetailsTempLabel>{forecast?.current.temp_c}ºC</DetailsTempLabel>
              <DetailsTempLabel
                style={{
                  fontSize: 20,
                  color: colors.gray,
                  paddingLeft: 20,
                  paddingBottom: 10,
                }}>
                st {forecast?.current.feelslike_c}
              </DetailsTempLabel>
            </HorizontalContainer>
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
            <WeatherLabel>
              {forecast?.location.localtime.split(' ')[1]}
            </WeatherLabel>
          </VerticalContainer>
        </HorizontalContainer>
      </DetailsTopContainer>
      {/* END TOP SECTION */}

      {/* MID SECTION: 3-day forecast by day/hour */}
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
                if (
                  hour >=
                  parseInt(
                    forecast.location.localtime.split(' ')[1].split(':')[0],
                    10,
                  )
                ) {
                  return (
                    <ForecastCard
                      key={hour}
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
                    key={hour}
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
      {/* END MID SECTION */}

      {/* BOTTOM SECTION: Other misc weather details */}
      <DetailsBottomContainer>
        {/* TODO: Expand up section */}
        {/* <DetailsBottomToggler></DetailsBottomToggler> */}
        {forecast && (
          <ParameterCardsContainer>
            <ParameterCard
              imgSource={require('../../assets/images/uvindex.png')}
              parameter={'UV Index'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[displayHour].uv} of 10`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/humidity.png')}
              parameter={'Chance of Rain'}
              value={`${forecast?.forecast.forecastday[currentDayIndex].hour[displayHour].chance_of_rain}%`}></ParameterCard>
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
      {/* END BOTTOM SECTION */}
    </SafeAreaView>
  );
}
