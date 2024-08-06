import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {PostType} from '../../../data/entities/entities';
import CustomButton from '../CustomButton/CustomButton';

type FormType = {
  title: string;
  body: string;
};

interface IPostForm {
  handleSave: (post: PostType) => void;
}

const PostForm = ({handleSave}: IPostForm) => {
  const [form, setForm] = useState<FormType>({title: '', body: ''});
  const [errors, setErrors] = useState<Partial<FormType>>({});

  const validate = () => {
    const newErrors: Partial<FormType> = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!form.body.trim()) {
      newErrors.body = 'Body is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setForm({title: '', body: ''});
      setErrors({});
      handleSave({id: JSON.stringify(Date.now()), ...form});
    }
  };
  const handleInputChange = (field: keyof FormType, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChangeText={(text) => handleInputChange('title', text)}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Body"
        multiline={true}
        numberOfLines={4}
        value={form.body}
        onChangeText={(text) => handleInputChange('body', text)}
      />
      {errors.body && <Text style={styles.errorText}>{errors.body}</Text>}

        <CustomButton text={'Submit'} callBack={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minWidth: '90%'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PostForm;
