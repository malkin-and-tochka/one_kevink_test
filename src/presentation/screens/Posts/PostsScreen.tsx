import React, {useCallback, useEffect, useState} from 'react';
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import PostCard from '../../components/PostCard/PostCard';
import {
  createPost,
  deletePostById,
  getPosts,
  updatePostById,
} from '../../../data/api/postsApi';
import {PostType} from '../../../data/entities/entities';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAllPosts,
  setPosts,
  updatePost,
  deletePost,
  addPost,
} from '../../../data/store/PostsReducer';
import PostForm from '../../components/PostForm/PostForm';
import { useToast } from 'react-native-toast-notifications';
import useErrorHandler from '../../../customHooks/toastHook';

const PostsScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const handleError = useErrorHandler();

  useEffect(() => {
    (async () => {
      const posts = await getPosts(handleError);
      if (posts) {
        dispatch(setPosts(posts));
      }
    })();
  }, [dispatch]);

  type deletePostType = (postId: string) => void;
  const deletePostHandler: deletePostType = useCallback(
    async (postId: string) => {
      const status = await deletePostById(postId, handleError);
      if (status === 200) dispatch(deletePost(postId));
    },
    [dispatch, deletePost],
  );

  const updatePostHandler = useCallback(
    async (post: PostType) => {
      const status = await updatePostById(post, handleError);
      if (status === 200) dispatch(updatePost(post));
    },
    [dispatch, updatePost],
  );

  const handleSave = useCallback(async (post: PostType) => {
    const status = await createPost(post, handleError);
    if (status === 201) dispatch(addPost(post));
  }, [dispatch, addPost, createPost]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        {posts.map(post => (
          <PostCard
            key={`${post.id}${post.title}`}
            id={post.id}
            title={post.title}
            body={post.body}
            deleteCard={deletePostHandler}
            updateCard={updatePostHandler}
          />
        ))}
        <PostForm handleSave={handleSave} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    paddingTop: 50,
    width: '90%'
  }
});

export default PostsScreen;
