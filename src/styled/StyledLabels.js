import {Text} from 'react-native';
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

export const DetailsTempLabel = styled(Text)`
  font-size: 45px;
  text-align: left;
  font-family: ${fonts.Poppins.Bolder};
  font-weight: 700;
  color: ${colors.white};
  margin-top: 20px;
`;

export const WeatherLabel = styled(Text)`
  color: ${colors.lightBlue};
  font-family: ${fonts.Poppins.Bold};
  font-weight: 600;
  font-size: 15px;
`;

export const WeatherData = styled(Text)`
  color: ${colors.white};
  font-family: ${fonts.Poppins.Bold};
  font-weight: 600;
  font-size: 25px;
`;

export const OtherCitiesHeading = styled(Text)`
  font-size: 16px;
  font-family: ${fonts.Poppins.Bolder};
  font-weight: 700;
  color: ${colors.white};
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 0px;
`;

export const OtherCityLabel = styled(Text)`
  color: ${colors.pink};
  font-family: ${fonts.Poppins.Bold};
  font-weight: 600;
  font-size: 12px;
`;

export const OtherCityName = styled(Text)`
  color: ${colors.white};
  font-family: ${fonts.Poppins.Medium};
  font-weight: 600;
  font-size: 16px;
`;

export const OtherCityWeather = styled(Text)`
  color: ${colors.lightBlue};
  font-family: ${fonts.Poppins.Bold};
  font-weight: 600;
  font-size: 10px;
`;

export const OtherCityWeatherData = styled(Text)`
  color: ${colors.white};
  font-family: ${fonts.Poppins.Bold};
  font-weight: 600;
  font-size: 17px;
`;
