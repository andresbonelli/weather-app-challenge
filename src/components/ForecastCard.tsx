import React from 'react';
import {Image, Text} from 'react-native';
import {ForecastCardView} from '../styled/StyledCards';
import {
  ForecastDayPhase,
  ForecastDayPhaseSelected,
  ForecastHumidity,
  ForecastTemp,
} from '../styled/StyledLabels';
import {VerticalContainer} from '../styled/StyledContainers';

type ForecastCardProps = {
  dayPhase: number;
  hour: HourForecast;
  onCardPress: Function;
  selected: boolean;
};

const ForecastCard: React.FC<ForecastCardProps> = ({
  dayPhase,
  hour: forecastHour,
  onCardPress,
  selected,
}) => {
  return (
    <>
      <ForecastCardView onPress={() => onCardPress()}>
        <VerticalContainer>
          {selected ? (
            <ForecastDayPhaseSelected>{dayPhase}</ForecastDayPhaseSelected>
          ) : (
            <ForecastDayPhase>{dayPhase}</ForecastDayPhase>
          )}
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
};

export default ForecastCard;
