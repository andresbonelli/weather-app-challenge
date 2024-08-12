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
  const [currentDayIndex, setCurrentDayIndex] = useState<0 | 1 | 2>(0);
  const [displayHour, setDisplayHour] = useState<number>(() => {
    if (forecast) {
      const localHour: string = forecast.location.localtime.split(' ')[1];
      return parseInt(localHour.split(':')[0], 10);
    } else {
      return new Date().getHours();
    }
  });

  // Special weather data forecast by day.
  const days: Array<{
    date: string;
    date_epoch: number;
    day: DayForecast;
    astro: AstroForecast;
    hour: HourForecast[];
    air_quality?: AirQuality;
  }> = forecast ? forecast.forecast.forecastday : [];
  // Special weather data forecast by hour.
  const hours: HourForecast[] = forecast
    ? forecast.forecast.forecastday[currentDayIndex].hour
    : [];

  // Strings representing day of the week
  const {tomorrow, dayAfter} = generateLabels(forecast?.location.tz_id);
  // Retrieve forecast data from API
  useEffect(() => {
    getForecast(currentLocation).then(forecast => setForecast(forecast));
  }, []);
  // Set forecast day to display (0 | 1 | 2)
  function selectDayForecast(dayIndex: 0 | 1 | 2) {
    setCurrentDayIndex(dayIndex);
  }
  // Set forecast hour to display (0 to 24)
  function selectHourForecast(hour: number) {
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
          accessibilityLabel="Go back"
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
            <ForecastButtonContainer onPress={() => selectDayForecast(0)}>
              <ForecastButton
                style={[currentDayIndex === 0 ? defaultStyles.selected : {}]}>
                Today
              </ForecastButton>
            </ForecastButtonContainer>
            <ForecastButtonContainer onPress={() => selectDayForecast(1)}>
              <ForecastButton
                style={[currentDayIndex === 1 ? defaultStyles.selected : {}]}>
                {tomorrow}
              </ForecastButton>
            </ForecastButtonContainer>
            <ForecastButtonContainer onPress={() => selectDayForecast(2)}>
              <ForecastButton
                style={[currentDayIndex === 2 ? defaultStyles.selected : {}]}>
                {dayAfter}
              </ForecastButton>
            </ForecastButtonContainer>
          </HorizontalContainer>
        </HorizontalContainer>

        {forecast && (
          <ForecastCardsContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {hours.map((hourForecast: HourForecast, index) => {
              const isSelected =
                currentDayIndex === 0
                  ? index >=
                    parseInt(
                      forecast.location.localtime.split(' ')[1].split(':')[0],
                      10,
                    )
                  : true;
              const isCurrentDay = currentDayIndex === 0;
              const hourToShow = isCurrentDay
                ? parseInt(
                    forecast.location.localtime.split(' ')[1].split(':')[0],
                    10,
                  )
                : 0;
              if (index >= hourToShow || !isCurrentDay) {
                return (
                  <ForecastCard
                    key={index}
                    onCardPress={() => selectHourForecast(index)}
                    dayPhase={index}
                    hour={hourForecast}
                    selected={isSelected && index === displayHour}
                  />
                );
              }
              return null;
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
              value={`${hours[displayHour].uv} of 10`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/humidity.png')}
              parameter={'Chance of Rain'}
              value={`${hours[displayHour].chance_of_rain}%`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/high-low.png')}
              parameter={'High / Low'}
              value={`${days[currentDayIndex].day.maxtemp_c} / ${days[currentDayIndex].day.mintemp_c}`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/moonphase.png')}
              parameter={'Moon Phase'}
              value={`${days[currentDayIndex].astro.moon_phase}`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/dewpoint.png')}
              parameter={'Dew Point'}
              value={`${hours[displayHour].dewpoint_c}ºC`}></ParameterCard>
            <ParameterCard
              imgSource={require('../../assets/images/visibility.png')}
              parameter={'Visibility'}
              value={`${hours[displayHour].vis_km} km.`}></ParameterCard>
          </ParameterCardsContainer>
        )}
      </DetailsBottomContainer>
      {/* END BOTTOM SECTION */}
    </SafeAreaView>
  );
}
