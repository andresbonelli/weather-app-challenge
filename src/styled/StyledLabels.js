import {Text, View, ScrollView} from 'react-native';
import {colors, fonts} from '../utils';
import styled from 'styled-components';

export const DateLabel = styled(Text)`
  font-size: 16px;
  font-family: ${fonts.Poppins.Medium};
  color: ${colors.gray};
  padding-left: 20px;
  padding-top: 30px;
  padding-bottom: 0px;
`;

export const BigTempLabel = styled(Text)`
  font-size: 75px;
  text-align: left;
  font-family: ${fonts.Poppins.Bolder};
  font-weight: 700;
  color: ${colors.white};
  padding-left: 20px;
`;

export const OtherCitiesLabel = styled(Text)`
  font-size: 16px;
  font-family: ${fonts.Poppins.Bolder};
  font-weight: 700;
  color: ${colors.white};
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 0px;
`;
