import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Pressable,
  Text,
  View,
  Keyboard,
} from 'react-native';
import {searchCity} from '../api';
import {fonts, colors} from '../utils';
import {StyledInput, SearchBarContainer} from '../styled/StyledInputs';
import {LocationIcon, StarIcon} from './Icons';

type SearchBarProps = {
  currentLocation: Location | null;
  onSearchPress: Function;
  onAddToFavorites: Function;
  favorite: Boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  currentLocation,
  onSearchPress,
  onAddToFavorites,
  favorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Location[]>([]);

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
      <SearchBarContainer>
        <View style={{transform: 'translate(0px, -2px)'}}>
          <LocationIcon color={colors.darkGray} width="20" height="20" />
        </View>
        <StyledInput
          placeholder={
            currentLocation
              ? `${currentLocation.name}, ${currentLocation.country}`
              : 'Buscar por ciudad...'
          }
          onChangeText={text => setSearchQuery(text)}></StyledInput>
        <Pressable onPress={() => onAddToFavorites()}>
          <View style={{transform: 'translate(0px, -2px)'}}>
            {favorite ? (
              <StarIcon
                color={colors.orange}
                width="26"
                height="26"
                fill={colors.orange}
              />
            ) : (
              <StarIcon
                color={colors.darkGray}
                width="26"
                height="26"
                fill="none"
              />
            )}
          </View>
        </Pressable>
      </SearchBarContainer>
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
};

export default SearchBar;
