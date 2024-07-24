import {View} from 'react-native';
import styled from 'styled-components';
import {colors} from '../utils';

export const CityCardView = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkViolet};
  border-color: ${colors.darkViolet};
  border-radius: 35px;
  padding-left: 8px;
  padding-right: 8px;
  height: 140px;
  width: 200px;
  margin-right: 9px;
`;

export const ForecastCardView = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.cyan};
  border-color: ${colors.darkViolet};
  border-radius: 5px;
  height: 140px;
  width: 120px;
  margin-right: 20px;
  padding: 10px;
`;

export const ParameterCardView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.white};
  border-color: ${colors.cyan};
  border-width: 3px;
  border-radius: 18px;
  height: 70px;
  width: 180px;
  padding: 10px;
  margin-bottom: 20px;
`;
