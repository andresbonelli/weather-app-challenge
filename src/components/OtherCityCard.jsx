import React from 'react';
import {Image} from 'react-native';
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

export default function OtherCityCard({weather, onRetrieve}) {
  return (
    <>
      <CityCardView onPress={onRetrieve}>
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
            <VerticalContainer style={{alignItems: 'left', marginLeft: 20}}>
              <OtherCityLabel>Location</OtherCityLabel>
              <OtherCityName>{weather.location.name}</OtherCityName>
            </VerticalContainer>
          </HorizontalContainer>
          <HorizontalContainer>
            <VerticalContainer>
              <OtherCityWeather>Wind</OtherCityWeather>
              <OtherCityWeatherData>
                {weather.current.wind_degree}
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
}
