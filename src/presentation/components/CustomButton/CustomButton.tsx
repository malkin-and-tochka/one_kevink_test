import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

interface ICustomButton {
  text: string;
  callBack: () => void;
  backgroundColor?: string;
}

const CustomButton = ({text, callBack, backgroundColor}: ICustomButton) => {
  return (
    <TouchableOpacity
      onPress={callBack}
      style={[
        styles.buttonContainer,
        backgroundColor ? {backgroundColor: backgroundColor} : null,
      ]}>
      <Text style={globalStyles.textLight}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    backgroundColor: '#C63031',
    width: '45%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100
  },
});

export default React.memo(CustomButton);
