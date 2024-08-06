import {CommentType, RootState} from '../entities/entities';

export enum CommentActionTypes {
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  UPDATE_COMMENT = 'UPDATE_COMMENT',
  SET_COMMENTS = 'SET_COMMENTS',
}

export type CommentAction =
  | {type: CommentActionTypes.ADD_COMMENT; payload: CommentType}
  | {type: CommentActionTypes.DELETE_COMMENT; commentId: string}
  | {type: CommentActionTypes.UPDATE_COMMENT; commentId: string; text: string}
  | {type: CommentActionTypes.SET_COMMENTS; payload: CommentType[]};

// Action Creators
export const addComment = (comment: CommentType): CommentAction => ({
  type: CommentActionTypes.ADD_COMMENT,
  payload: comment,
});

export const setComments = (comments: CommentType[]): CommentAction => ({
  type: CommentActionTypes.SET_COMMENTS,
  payload: comments,
});

export const deleteComment = (commentId: string): CommentAction => ({
  type: CommentActionTypes.DELETE_COMMENT,
  commentId,
});

export const updateComment = (
  commentId: string,
  text: string,
): CommentAction => ({
  type: CommentActionTypes.UPDATE_COMMENT,
  commentId,
  text,
});

const initialState: {comments: CommentType[]} = {
  comments: [],
};

const commentReducer = (state = initialState, action: CommentAction) => {
  switch (action.type) {
    case CommentActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case CommentActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case CommentActionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.commentId,
        ),
      };
    case CommentActionTypes.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.commentId
            ? {...comment, text: action.text}
            : comment,
        ),
      };
    default:
      return state;
  }
};

export const selectAllComments = (state: RootState): CommentType[] =>
  state.comments.comments;

export const selectCommentsByPostId = (
  state: RootState,
  postId: string,
): CommentType[] =>
  state.comments.comments.filter(comment => comment.postId === postId);

export const selectCommentById = (
  state: RootState,
  commentId: string,
): CommentType | undefined =>
  state.comments.comments.find(comment => comment.id === commentId);

export const selectCommentsLength = (state: RootState): number =>
  state.comments.comments.length;

export default commentReducer;
