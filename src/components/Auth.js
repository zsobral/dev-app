import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAuth0Client from "@auth0/auth0-spa-js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [auth0Client, setAuth0Client] = useState(null);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0Client = await createAuth0Client({
        audience: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        redirect_uri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
        cacheLocation: "localstorage",
      });
      setAuth0Client(auth0Client);
      const urlParams = new URLSearchParams(window.location.search || "");

      if (urlParams.has("code") && urlParams.has("state")) {
        await auth0Client.handleRedirectCallback();
        navigate("/");
      }

      const isAuthenticated = await auth0Client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0Client.getUser();
        const token = await auth0Client.getTokenSilently();
        setToken(token);
        setUser(user);
      }

      setIsLoading(false);
    };

    initAuth0();
  }, [navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        isLoading,
        login: (...params) => auth0Client.loginWithRedirect(...params),
        getToken: (...params) => auth0Client.getTokenSilently(...params),
        logout: (...params) => auth0Client.logout(...params),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
