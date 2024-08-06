import {PostType, RootState} from '../entities/entities';

export enum PostActionTypes {
  ADD_POST = 'ADD_POST',
  DELETE_POST = 'DELETE_POST',
  UPDATE_POST = 'UPDATE_POST',
  SET_POSTS = 'SET_POSTS',
}

export type PostAction =
  | {type: PostActionTypes.ADD_POST; payload: PostType}
  | {type: PostActionTypes.DELETE_POST; postId: string}
  | {
      type: PostActionTypes.UPDATE_POST;
      postId: string;
      title: string;
      body: string;
    }
  | {type: PostActionTypes.SET_POSTS; payload: PostType[]};

// Action Creators
export const addPost = (post: PostType): PostAction => ({
  type: PostActionTypes.ADD_POST,
  payload: post,
});

export const setPosts = (posts: PostType[]): PostAction => ({
  type: PostActionTypes.SET_POSTS,
  payload: posts,
});

export const deletePost = (postId: string): PostAction => ({
  type: PostActionTypes.DELETE_POST,
  postId,
});

export const updatePost = (post: PostType): PostAction => ({
  type: PostActionTypes.UPDATE_POST,
  postId: post.id,
  title: post.title,
  body: post.body,
});

const initialState: {posts: PostType[]} = {
  posts: [],
};

const postReducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
    case PostActionTypes.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
      case PostActionTypes.SET_POSTS:
        return {
          ...state,
          posts: action.payload,
        };
    case PostActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId),
      };
    case PostActionTypes.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId
            ? {...post, title: action.title, body: action.body}
            : post,
        ),
      };
    default:
      return state;
  }
};

export const selectAllPosts = (state: RootState): PostType[] =>
  state.posts.posts;

export const selectPostById = (
  state: RootState,
  postId: string,
): PostType | undefined => state.posts.posts.find(post => post.id === postId);

export const selectPostsLength = (state: RootState) : number => state.posts.posts.length

export default postReducer;
