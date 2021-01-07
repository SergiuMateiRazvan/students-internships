
export const USER_KEY = 'user-key';

export const isUserAuthenticated = () => (
  sessionStorage.getItem(USER_KEY) != null
);


export const setUserAuthenticated = (userMail) =>
  sessionStorage.setItem(USER_KEY, userMail);


export const setUserLoggedOut = () =>
  sessionStorage.removeItem(USER_KEY);
