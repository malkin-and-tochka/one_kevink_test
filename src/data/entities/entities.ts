export type PostType = {
    id: string,
    title: string,
    body: string
}

export type CommentType = {
  id: string,
  postId: string,
  text: string, 
}

export type RootState = {
    posts: {
      posts: PostType[];
    };
    comments: {
      comments: CommentType[];
    }
  };