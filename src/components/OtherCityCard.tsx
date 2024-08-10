import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {CityCardView} from '../styled/StyledCards';
import {
  OtherCityLabel,
  OtherCityName,
  OtherCityWeather,
  OtherCityWeatherData,
} from '../styled/StyledLabels';
import {
  HorizontalContainer,
  VerticalContainer,
} from '../styled/StyledContainers';

type OtherCityCardProps = {
  weather: ApiResponse;
  onRetrieve: Function;
};

const OtherCityCard: React.FC<OtherCityCardProps> = ({weather, onRetrieve}) => {
  return (
    <>
      <CityCardView onPress={() => onRetrieve()}>
        <VerticalContainer>
          <HorizontalContainer>
            <Image
              source={{
                uri: `https://${weather.current.condition.icon}`,
              }}
              style={{
                width: 75,
                height: 75,
                marginRight: 20,
                marginLeft: 20,
              }}
              resizeMode="contain"
            />
            <VerticalContainer style={otherCityStyle.title}>
              <OtherCityName>{weather.location.name}</OtherCityName>
              <OtherCityLabel>{weather.location.country}</OtherCityLabel>
            </VerticalContainer>
          </HorizontalContainer>
          <HorizontalContainer>
            <VerticalContainer>
              <OtherCityWeather>Wind</OtherCityWeather>
              <OtherCityWeatherData>
                {weather.current.wind_kph}
              </OtherCityWeatherData>
            </VerticalContainer>
            <VerticalContainer>
              <OtherCityWeather>Temp</OtherCityWeather>
              <OtherCityWeatherData>
                {weather.current.temp_c}ºC
              </OtherCityWeatherData>
            </VerticalContainer>
            <VerticalContainer>
              <OtherCityWeather>Humidity</OtherCityWeather>
              <OtherCityWeatherData>
                {weather.current.humidity}%
              </OtherCityWeatherData>
            </VerticalContainer>
          </HorizontalContainer>
        </VerticalContainer>
      </CityCardView>
    </>
  );
};

const otherCityStyle = StyleSheet.create({
  title: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
});

export default OtherCityCard;
