import React, {useCallback, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import TextOrInput from '../TextOrInput/TextOrINput';
import {PostType} from '../../../data/entities/entities';
import CustomButton from '../CustomButton/CustomButton';
import {globalStyles} from '../../../styles/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  NavigationStackParams,
  POST,
} from '../../../navigation/navigationParams';

interface IPostCard {
  id: string;
  title: string;
  body: string;
  deleteCard: (postId: string) => void;
  updateCard: (post: PostType) => void;
}

const PostCard = ({id, title, body, deleteCard, updateCard}: IPostCard) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>(title);
  const [postBody, setPostBody] = useState<string>(body);

  const setTitleHandler = useCallback(
    (title: string) => setPostTitle(title),
    [setPostTitle],
  );

  const setBodyHandler = useCallback(
    (body: string) => setPostBody(body),
    [setPostTitle],
  );

  const navigatin = useNavigation<NavigationProp<NavigationStackParams>>();

  const deleteCardHandler = useCallback(() => deleteCard(id), [deleteCard]);

  const editHandler = useCallback(() => setIsEditing(true), [setIsEditing]);

  const handleSave = useCallback(() => {
    updateCard({id, title: postTitle, body: postBody});
    setIsEditing(false);
  }, [updateCard, setIsEditing, id, postBody, postTitle]);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        disabled={isEditing}
        onPress={() => navigatin.navigate(POST, {postId: id})}
        style={styles.textContainer}>
        <TextOrInput
          isEditing={isEditing}
          text={postTitle}
          onChangeText={setTitleHandler}
        />
        <TextOrInput
          isEditing={isEditing}
          text={postBody}
          onChangeText={setBodyHandler}
        />
      </TouchableOpacity>
      <View style={globalStyles.row}>
        <CustomButton
          text={isEditing ? 'Done' : 'Edit'}
          callBack={isEditing ? handleSave : editHandler}
          backgroundColor="#208724"
        />
        <CustomButton text={'Delete'} callBack={deleteCardHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#BFBFBF',
    padding: 10,
    borderRadius: 10
  },
  textContainer: {
    borderRadius: 5,
  },
});

export default PostCard;
