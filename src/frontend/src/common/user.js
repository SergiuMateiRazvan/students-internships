
export const USER_KEY = 'user-key';

export const isUserAuthenticated = () => (
  sessionStorage.getItem(USER_KEY) != null
);
