import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootState} from '../../../data/entities/entities';
import {CommentType} from '../../../data/entities/entities';
import Comment from '../../components/Comment/Comment';
import {selectPostById} from '../../../data/store/PostsReducer';
import {
  createComment,
  deleteCommentById,
  getAllPostComments,
  updateCommentById,
} from '../../../data/api/commentsApi';
import CommentForm from '../../components/CommentForm/CommentForm';
import {NavigationStackParams} from '../../../navigation/navigationParams';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  addComment,
  deleteComment,
  selectAllComments,
  setComments,
  updateComment,
} from '../../../data/store/CommentsReducer';
import useErrorHandler from '../../../customHooks/toastHook';

type PostScreenRouteProp = RouteProp<{params: {postId: string}}, 'params'>;

const PostScreen: React.FC = () => {
  const route = useRoute<PostScreenRouteProp>();
  const postId = route.params.postId;
  const navigation = useNavigation<NavigationProp<NavigationStackParams>>();

  const post = useSelector((state: RootState) => selectPostById(state, postId));

  const dispatch = useDispatch();
  const comments = useSelector(selectAllComments);

  const handleError = useErrorHandler();

  useEffect(() => {
    (async () => {
      if (postId) {
        const fetchedComments = await getAllPostComments(postId, handleError);
        if (fetchedComments) {
          dispatch(setComments(fetchedComments));
        }
      }
    })();
  }, [postId]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found</Text>
      </View>
    );
  }

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      const status = await deleteCommentById(commentId, handleError);
      if (status === 200) dispatch(deleteComment(commentId));
    },
    [dispatch, deleteComment],
  );

  const handleUpdateComment = useCallback(
    async (commentId: string, text: string) => {
      const status = await updateCommentById(commentId, text, handleError);
      if (status === 200) dispatch(updateComment(commentId, text));
    },
    [],
  );

  const handleAddComment = useCallback(
    async ({id, postId, text}: CommentType) => {
      const status = await createComment({id, postId, text}, handleError);
      if (status === 201) dispatch(addComment({id, postId, text}));
    },
    [comments, post.id],
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.postBorder}>
        <Text style={styles.title}>Title: {post.title}</Text>
        <Text style={styles.body}>Body: {post.body}</Text>
      </View>
      <Text style={styles.commentTitle}>Comments</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        {comments.map(item => (
          <Comment
            key={item.id}
            id={item.id}
            postId={item.postId}
            text={item.text}
            deleteComment={handleDeleteComment}
            updateComment={handleUpdateComment}
          />
        ))}
        <CommentForm postId={postId} handleSave={handleAddComment} />
      </ScrollView>
      <View style={styles.backButtonContainer}>
        <CustomButton text="Back" callBack={handleBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    paddingTop: 50,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  postBorder: {
    flexDirection: 'column',
    gap: 10,
    borderRadius: 20,
    borderColor: '#353535',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
});

export default PostScreen;
