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
