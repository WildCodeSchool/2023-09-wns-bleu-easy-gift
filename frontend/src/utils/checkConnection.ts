import Cookies from "js-cookie";
export const checkUserConnected = () => {
  const cookies = Cookies;
  const emailCookie = cookies.get("email");
  if (emailCookie) {
    return true;
  }
  return false;
};
