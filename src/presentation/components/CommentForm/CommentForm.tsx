import React, { useCallback, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { CommentType } from '../../../data/entities/entities';
import CustomButton from '../CustomButton/CustomButton';

type CommentFormType = {
  text: string;
};

interface ICommentForm {
  postId: string;
  handleSave: (comment: CommentType) => void;
}

const CommentForm = ({ postId, handleSave }: ICommentForm) => {
  const [form, setForm] = useState<CommentFormType>({ text: '' });
  const [errors, setErrors] = useState<Partial<CommentFormType>>({});

  const validate = () => {
    const newErrors: Partial<CommentFormType> = {};
    if (!form.text.trim()) {
      newErrors.text = 'Comment text is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(() => {
    if (validate()) {
      handleSave({ id: JSON.stringify(Date.now()), postId, text: form.text });
      setForm({ text: '' });
      setErrors({});
    }
  }, [validate, setForm, setErrors, handleSave]);

  const handleInputChange = (field: keyof CommentFormType, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={form.text}
        onChangeText={(text) => handleInputChange('text', text)}
      />
      {errors.text && <Text style={styles.errorText}>{errors.text}</Text>}
      <CustomButton text={'Submit'} callBack={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minWidth: '100%'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CommentForm;
