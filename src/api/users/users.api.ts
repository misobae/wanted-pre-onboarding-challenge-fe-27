import { fetchData } from "../fetchData";
import { SignRequest, SignResponse } from "./users.dto";

export const postSignUp = ({ email, password }: SignRequest) => {
  return fetchData<SignResponse>("/users/create", {
    method: "POST",
    body: { email, password },
  });
};

export const postSignIn = ({ email, password }: SignRequest) => {
  return fetchData<SignResponse>("/users/login", {
    method: "POST",
    body: { email, password },
  });
};
