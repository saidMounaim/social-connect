export interface registerUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CurrentUserProps {
  user: {
    id?: string;
    name: string;
    email: string;
    image?: string;
  };
}

export interface ProfileEditFormProps {
  userInfo: {
    name: string;
    image?: string;
  };
}

export interface CommentCardProps {
  id: string;
  body: string;
  createdAt: Date;
  user: CurrentUserProps["user"];
}

export interface LikesProps {
  id: string;
  userId: string;
  postId: string;
}

export interface PostCardProps {
  id: string;
  body: string;
  image?: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image?: string;
  };
  comments: CommentCardProps[];
  likes: LikesProps[];
}

export interface AddCommentFormProps {
  user: CurrentUserProps["user"];
  postId: string;
}
