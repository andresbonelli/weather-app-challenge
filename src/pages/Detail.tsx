import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  VerticalContainer,
  HorizontalContainer,
  DetailsTopContainer,
  DetailsMidContainer,
  ForecastCardsContainer,
  ParameterCardsContainer,
  DetailsBottomContainer,
} from '../styled/StyledContainers';
import Gradient from '../components/Gradient';
import {colors, defaultStyles} from '../utils';

import {getForecast} from '../api';
import {ArrowLeft} from '../components/Icons';
import {DetailsTempLabel, WeatherLabel} from '../styled/StyledLabels';
import {
  DetailsBottomToggler,
  ForecastButton,
  ForecastButtonContainer,
} from '../styled/StyledButtons';
import {ForecastCardView, ParameterCardView} from '../styled/StyledCards';

export default function Details({navigation, route}: any) {
  const height = Dimensions.get('window').height;
  const currentLocation: Location = route.params.location;
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  const hour = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  useEffect(() => {
    getForecast(currentLocation).then(forecast => setForecast(forecast));
  }, []);

  return (
    <SafeAreaView>
      {/* BACKGROUND */}
      <View style={defaultStyles.backgroundGradient}>
        <Gradient
          colorFrom={colors.lightBlue}
          colorTo={colors.darkViolet}
          id="top-card"
          borderRadius={20}
          orientation={'vertical'}
          height={height / 4}
        />
      </View>
      {/* TOP SECTION */}
      <DetailsTopContainer>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 999}}>
          <ArrowLeft color={colors.gray} width={25} height={25} />
        </TouchableOpacity>
        <HorizontalContainer>
          <VerticalContainer style={{alignItems: 'flex-start', paddingTop: 20}}>
            <WeatherLabel style={{color: colors.gray}}>
              {forecast?.location.name}, {forecast?.location.region},
            </WeatherLabel>

            <WeatherLabel style={{color: colors.gray}}>
              {forecast?.location.country}
            </WeatherLabel>
            <DetailsTempLabel>{forecast?.current.temp_c}ºC</DetailsTempLabel>
          </VerticalContainer>
          <VerticalContainer style={{alignItems: 'center', paddingBottom: 20}}>
            <Image
              source={{
                uri: `https://${forecast?.current.condition.icon}`,
              }}
              style={{
                width: 115,
                height: 115,
              }}
              resizeMode="contain"
            />
            <WeatherLabel>{hour}</WeatherLabel>
          </VerticalContainer>
        </HorizontalContainer>
      </DetailsTopContainer>
      {/* MID SECTION */}
      <DetailsMidContainer>
        <HorizontalContainer
          style={{justifyContent: 'space-between', paddingTop: 40}}>
          <Text style={defaultStyles.darkTitle}>Forecast:</Text>
          <ForecastButtonContainer>
            <ForecastButton>Tomorrow</ForecastButton>
          </ForecastButtonContainer>
        </HorizontalContainer>
        <ForecastCardsContainer
          horizontal={true}
          showsHorizontalScrollIndicator={true}>
          <ForecastCardView></ForecastCardView>
          <ForecastCardView></ForecastCardView>
          <ForecastCardView></ForecastCardView>
          <ForecastCardView></ForecastCardView>
        </ForecastCardsContainer>
      </DetailsMidContainer>
      {/* BOTTOM SECTION */}
      {/* TODO: Expand up section */}
      <DetailsBottomContainer>
        <DetailsBottomToggler></DetailsBottomToggler>
        <ParameterCardsContainer>
          <ParameterCardView></ParameterCardView>
          <ParameterCardView></ParameterCardView>
          <ParameterCardView></ParameterCardView>
          <ParameterCardView></ParameterCardView>
          <ParameterCardView></ParameterCardView>
          <ParameterCardView></ParameterCardView>
        </ParameterCardsContainer>
      </DetailsBottomContainer>
    </SafeAreaView>
  );
}
