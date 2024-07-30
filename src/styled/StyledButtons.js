import {TouchableOpacity, Text, View} from 'react-native';
import {colors, fonts} from '../utils';
import styled from 'styled-components';

export const ClearButtonContainer = styled(TouchableOpacity)`
  background-color: ${colors.pink};
  justify-content: center;
  margin-left: 5px;
  padding-left: 15px;
  padding-top: 5px;
  padding-right: 15px;
  padding-bottom: 5px;
  border-width: 1px;
  border-color: ${colors.pink};
  border-radius: 9px;
`;

export const ClearButton = styled(Text)`
  font-size: 16px;
  font-family: ${fonts.Poppins.Bolder};
  font-weight: 700;
  color: ${colors.white};
`;

export const ForecastButtonContainer = styled(TouchableOpacity)`
  background-color: ${colors.lightBlue};
  justify-content: center;
  margin-left: 5px;
  padding-left: 15px;
  padding-top: 5px;
  padding-right: 15px;
  padding-bottom: 5px;
  border-width: 1px;
  border-color: ${colors.lightBlue};
  border-radius: 9px;
`;

export const ForecastButton = styled(Text)`
  font-size: 14px;
  font-family: ${fonts.Poppins.Bold};
  font-weight: 600;
  color: ${colors.white};
`;

export const DetailsBottomToggler = styled(View)`
  height: 5px;
  width: 50px;
  background-color: ${colors.lightBlue};
  margin-top: 20px;
`;
