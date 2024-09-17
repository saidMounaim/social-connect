export interface registerUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CurrentUserProps {
  user: {
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
}

export interface AddCommentFormProps {
  user: CurrentUserProps["user"];
  postId: string;
}
