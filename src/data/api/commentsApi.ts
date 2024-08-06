import { CommentType } from '../entities/entities';
import { axiosManager } from './apiManager';

type ErrorHandler = () => string | undefined;

export const getComments = async (onErrorCallback: ErrorHandler): Promise<CommentType[] | undefined> => {
  try {
    const res = await axiosManager.get('/comments');
    return res.data;
  } catch (e) {
    onErrorCallback();
  }
};

export const getAllPostComments = async (id: string, onErrorCallback: ErrorHandler): Promise<CommentType[] | undefined> => {
  try {
    const comments = await getComments(onErrorCallback);
    return comments?.filter(comment => comment.postId === id);
  } catch (e) {
    onErrorCallback();
  }
};

export const createComment = async ({id, text, postId}: CommentType, onErrorCallback: ErrorHandler): Promise<number | undefined> => {
  try {
    const res = await axiosManager.post('/comments', {id, text, postId});
    return res.status
  } catch (e) {
    onErrorCallback();
  }
};

export const updateCommentById = async (id: string, text: string, onErrorCallback: ErrorHandler): Promise<number | undefined> => {
  try {
    const res = await axiosManager.put(`/comments/${id}`, {text});
    return res.status
  } catch (e) {
    onErrorCallback();
  }
};

export const deleteCommentById = async (id: string, onErrorCallback: ErrorHandler): Promise<number | undefined> => {
  try {
    const res = await axiosManager.delete(`/comments/${id}`);
    return res.status;
  } catch (e) {
    onErrorCallback();
  }
};
