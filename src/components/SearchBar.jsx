import React, {useState, useEffect} from 'react';
import {
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from 'react-native';
import {searchCity} from '../api';

import {fonts, colors} from '../utils';

export default function SearchBar({currentLocation, onSearchPress}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      searchCity(searchQuery)
        .then(data => {
          setSearchResult(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [searchQuery]);

  return (
    <>
      <TextInput
        placeholder={
          currentLocation
            ? `${currentLocation.name}, ${currentLocation.country}`
            : 'Buscar por ciudad...'
        }
        onChangeText={text => setSearchQuery(text)}></TextInput>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {searchQuery ? (
          <>
            {searchResult.map(location => (
              <Pressable
                key={location.id}
                onPress={() => {
                  onSearchPress(location);
                  setSearchResult([]);
                }}>
                <Text
                  style={{
                    fontFamily: fonts.Poppins.Bold,
                    fontSize: 24,
                    fontWeight: '200',
                    color: colors.white,
                  }}>
                  {location.name}, {location.region}
                </Text>
              </Pressable>
            ))}
          </>
        ) : (
          <></>
        )}
      </TouchableWithoutFeedback>
    </>
  );
}
