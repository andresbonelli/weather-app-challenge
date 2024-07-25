import React from 'react';
import {Image, Text} from 'react-native';
import {ForecastCardView} from '../styled/StyledCards';
import {
  ForecastDayPhase,
  ForecastHumidity,
  ForecastTemp,
} from '../styled/StyledLabels';
import {VerticalContainer} from '../styled/StyledContainers';

export default function ForecastCard({dayPhase, forecastHour, onCardPress}) {
  return (
    <>
      <ForecastCardView onPress={onCardPress}>
        <VerticalContainer>
          <ForecastDayPhase>{dayPhase}</ForecastDayPhase>
          <Image
            source={{
              uri: `https://${forecastHour.condition.icon}`,
            }}
            style={{
              width: 45,
              height: 45,
              marginRight: 20,
              marginLeft: 20,
            }}
            resizeMode="contain"
          />
          <ForecastTemp>{forecastHour.temp_c}ºC</ForecastTemp>
          <ForecastHumidity>{forecastHour.humidity}%</ForecastHumidity>
        </VerticalContainer>
      </ForecastCardView>
    </>
  );
}
