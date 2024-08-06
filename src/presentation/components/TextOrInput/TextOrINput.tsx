import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

interface ITextInput {
    isEditing: boolean,
    text: string,
    onChangeText: (text: string) => void
}

const TextOrInput = ({ isEditing, text, onChangeText } : ITextInput) => {
  if (isEditing) {
    return (
      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder="Enter text"
        style={[globalStyles.textBlack, styles.textBorder]}
        multiline={true}
      />
    );
  } else {
    return (
      <Text style={[globalStyles.textBlack, styles.textBorder]}>
        {text}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  textBorder: {
    borderWidth: 2,
    borderColor: '#353535',
    padding: 5
  }
})

export default React.memo(TextOrInput);