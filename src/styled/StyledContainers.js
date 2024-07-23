import {View, ScrollView} from 'react-native';
import {colors} from '../utils';
import styled from 'styled-components';

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

export const OtherCitiesContainer = styled(ScrollView)`
  padding-left: 20px;
  padding-bottom: 20px;
  margin: 30px;
  z-index: -999;
`;
