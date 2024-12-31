export interface SignRequest {
  email: string;
  password: string;
}

export interface SignResponse {
  message: string;
  token: string;
}
