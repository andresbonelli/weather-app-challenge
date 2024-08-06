import React from 'react';
import {Image, ImageSourcePropType, Text} from 'react-native';
import {ParameterCardView} from '../styled/StyledCards';
import {
  ForecastParameterName,
  ForecastParameterValue,
} from '../styled/StyledLabels';
import {
  HorizontalContainer,
  VerticalContainer,
} from '../styled/StyledContainers';

type ParameterCardProps = {
  imgSource: ImageSourcePropType;
  parameter: string;
  value: string;
};

const ParameterCard: React.FC<ParameterCardProps> = ({
  imgSource,
  parameter,
  value,
}) => {
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
};

export default ParameterCard;
