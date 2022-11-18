export interface User {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
