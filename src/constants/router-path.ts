export const ROUTER_PATHS = {
  INDEX: "/",
  SIGNIN: "/auth",
  SIGNUP: "/auth/sign-up",
  TODO: "/todo",
  TODO_DETAIL: (id: string) => `/todo/${id}`,
};
