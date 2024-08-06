import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TextOrInput from '../../components/TextOrInput/TextOrINput';
import CustomButton from '../CustomButton/CustomButton';
import {CommentType} from '../../../data/entities/entities';
import {globalStyles} from '../../../styles/globalStyles';

interface IComment {
  id: string;
  postId: string;
  text: string;
  deleteComment: (commentId: string) => void;
  updateComment: (commentId: string, text: string) => void;
}

const Comment = ({
  id,
  postId,
  text,
  deleteComment,
  updateComment,
}: IComment) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(text);

  const setTextHandler = useCallback(
    (text: string) => setCommentText(text),
    [setCommentText],
  );

  const deleteCommentHandler = useCallback(
    () => deleteComment(id),
    [deleteComment, id],
  );
  const editHandler = useCallback(() => setIsEditing(true), [setIsEditing]);
  const handleSave = useCallback(() => {
    updateComment(id, commentText);
    setIsEditing(false);
  }, [updateComment, setIsEditing, id, commentText, postId]);

  return (
    <View style={styles.commentContainer}>
      <View style={styles.textContainer}>
        <TextOrInput
          isEditing={isEditing}
          text={commentText}
          onChangeText={setTextHandler}
        />
      </View>
      <View style={globalStyles.row}>
        <CustomButton
          text={isEditing ? 'Done' : 'Edit'}
          callBack={isEditing ? handleSave : editHandler}
          backgroundColor="#208724"
        />
        <CustomButton text={'Delete'} callBack={deleteCommentHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    width: '90%',
    marginTop: 20,
  },
  textContainer: {
    borderRadius: 5,
  },
});

export default Comment;
