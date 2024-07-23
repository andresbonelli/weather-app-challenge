import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  VerticalContainer,
  HorizontalContainer,
  MainContainer,
} from '../styled/StyledContainers';
import Gradient from '../components/Gradient';
import {colors, defaultStyles} from '../utils';

import {getForecast} from '../api';
import {ArrowLeft} from '../components/Icons';

export default function Details({navigation, route}: any) {
  const height = Dimensions.get('window').height;
  const currentLocation: Location = route.params.location;
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  useEffect(() => {
    getForecast(currentLocation).then(forecast => setForecast(forecast));
  }, []);

  return (
    <SafeAreaView>
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
      <VerticalContainer>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 999}}>
          <ArrowLeft color={colors.black} width={19} height={19} />
        </TouchableOpacity>
        <HorizontalContainer>
          <Text>DETALLES </Text>
          <Text>
            {forecast?.location.name}, {forecast?.location.country}
          </Text>
        </HorizontalContainer>

        <Text>Hoy {forecast?.forecast.forecastday[0].day.avgtemp_c}</Text>
        <Text>Mañana {forecast?.forecast.forecastday[1].day.avgtemp_c}</Text>
        <Text>Pasado {forecast?.forecast.forecastday[2].day.avgtemp_c}</Text>
      </VerticalContainer>
    </SafeAreaView>
  );
}
