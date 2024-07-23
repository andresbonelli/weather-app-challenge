import {TextInput, View} from 'react-native';
import {colors} from '../utils';
import styled from 'styled-components';

export const SearchBarContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  border-radius: 10px;
  border: 1px solid ${colors.gray};
  margin: 20px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${colors.white};
`;

export const StyledInput = styled(TextInput).attrs({
  textAlign: 'left',
  flex: 1,
  color: colors.black,
  fontSize: 15,
  lineSpacing: 23,
  marginLeft: 10,
  containerStyle: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.white,
    backgroundColor: colors.white,
    paddingLeft: 18,
    paddingRight: 10,
  },
})``;
