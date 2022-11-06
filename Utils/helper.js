export const setAuthenticationToken = async ({ token }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("access_token", token.accessToken);
      sessionStorage.setItem("refresh_token", token.refreshToken);
      return;
    }
  };

  export const getAuthenticationToken = () => {
    return sessionStorage.getItem('access_token')
  }
  
  