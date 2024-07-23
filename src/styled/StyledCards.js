import {View} from 'react-native';
import styled from 'styled-components';
import {colors} from '../utils';

export const CityCard = styled(View)`
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
