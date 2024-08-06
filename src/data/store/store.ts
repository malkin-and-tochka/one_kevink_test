import { createStore, combineReducers } from 'redux';
import postReducer from './PostsReducer';
import commentReducer from './CommentsReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  comments: commentReducer,
});

const store = createStore(rootReducer);

export default store;