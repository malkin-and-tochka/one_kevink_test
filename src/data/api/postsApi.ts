import { PostType } from '../entities/entities';
import { axiosManager } from './apiManager';

type ErrorHandler = () => void;

export const getPosts = async (onErrorCallback: ErrorHandler): Promise<PostType[] | undefined> => {
  try {
    const res = await axiosManager.get('/posts');
    return res.data;
  } catch (e) {
    onErrorCallback();
  }
};

export const getPostById = async (id: string, onErrorCallback: ErrorHandler): Promise<PostType | undefined> => {
  try {
    const res = await axiosManager.get(`/posts/${id}`);
    return res.data;
  } catch (e) {
    onErrorCallback();
  }
};

export const createPost = async ({id, title, body}: PostType, onErrorCallback: ErrorHandler): Promise<number | undefined> => {
  try {
    const res = await axiosManager.post('/posts', {id, title, body});
    return res.status
  } catch (e) {
    onErrorCallback();
  }
};

export const updatePostById = async ({id, title, body}: PostType, onErrorCallback: ErrorHandler): Promise<number | undefined> => {
  try {
    const res = await axiosManager.put(`/posts/${id}`, {title, body});
    return res.status
  } catch (e) {
    onErrorCallback();
  }
};

export const deletePostById = async (id: string, onErrorCallback: ErrorHandler): Promise<number | undefined> => {
  try {
    const res = await axiosManager.delete(`/posts/${id}`);
    return res.status
  } catch (e) {
    onErrorCallback();
  }
};
