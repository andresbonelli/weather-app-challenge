import React from 'react';
import {Image, Text} from 'react-native';
import {ParameterCardView} from '../styled/StyledCards';
import {
  ForecastParameterName,
  ForecastParameterValue,
} from '../styled/StyledLabels';
import {
  HorizontalContainer,
  VerticalContainer,
} from '../styled/StyledContainers';

export default function ParameterCard({imgSource, parameter, value}) {
  return (
    <>
      <ParameterCardView>
        <HorizontalContainer>
          <Image
            source={imgSource}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
          <VerticalContainer>
            <ForecastParameterName>{parameter}</ForecastParameterName>
            <ForecastParameterValue>{value}</ForecastParameterValue>
          </VerticalContainer>
        </HorizontalContainer>
      </ParameterCardView>
    </>
  );
}
