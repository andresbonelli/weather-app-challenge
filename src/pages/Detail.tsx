import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  VerticalContainer,
  HorizontalContainer,
  MainContainer,
} from '../styled/StyledContainers';
import {getForecast} from '../api';

export default function Details({route}: any) {
  const currentLocation: Location = route.params.location;
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  useEffect(() => {
    getForecast(currentLocation).then(forecast => setForecast(forecast));
  }, []);

  return (
    <SafeAreaView>
      <MainContainer>
        <HorizontalContainer>
          <Text>DETALLES </Text>
          <Text>
            {forecast?.location.name}, {forecast?.location.country}
          </Text>
        </HorizontalContainer>

        <Text>Hoy {forecast?.forecast.forecastday[0].day.avgtemp_c}</Text>
        <Text>Mañana {forecast?.forecast.forecastday[1].day.avgtemp_c}</Text>
        <Text>Pasado {forecast?.forecast.forecastday[2].day.avgtemp_c}</Text>
      </MainContainer>
    </SafeAreaView>
  );
}
