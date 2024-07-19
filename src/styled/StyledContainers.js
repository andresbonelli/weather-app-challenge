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
  padding-vertical: 15px;
  padding-horizontal: 10px;
  background-color: ${colors.darkViolet};
`;

export const VerticalContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-vertical: 10px;
  padding-horizontal: 15px;
  background-color: ${colors.darkViolet};
`;
