import {View, ScrollView} from 'react-native';
import {colors} from '../utils';
import styled from 'styled-components';

// GENERAL
export const MainContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  background-color: ${colors.pink};
`;

export const HorizontalContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const VerticalContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding-horizontal: 10px;
`;

// SCROLLABLE SECTIONS
export const OtherCitiesContainer = styled(ScrollView)`
  padding-left: 20px;
  padding-bottom: 20px;
  margin: 30px;
  z-index: -999;
`;

export const ForecastCardsContainer = styled(ScrollView)`
  padding-left: 20px;
  padding-bottom: 20px;
  margin: 30px;
  z-index: -999;
`;

export const DetailsTopContainer = styled(View)`
  flex-direction: column;
  height: 200px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
`;

export const DetailsMidContainer = styled(View)`
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const DetailsBottomContainer = styled(View)`
  flex-direction: column;
  width: 100%;
  padding: 0px;
`;

export const ParameterCardsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  border-width: 1px;
  border-color: ${colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-left: 10px;
  padding-top: 30px;
  padding-right: 10px;
  padding-bottom: 10px;
  box-shadow: 0px 0px 1px black;
  elevation: 5;
`;
