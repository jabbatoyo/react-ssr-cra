import React from "react";
import cookie from "react-cookies";

const CookiesContext = React.createContext();

export function CookiesProvider(props) {

  async function addCookies(name) {
    const current = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + 1);
    cookie.save(name, "cookie: acepted", {
      path: "/",
      expires: nextYear,
    });
  }

  return (
    <CookiesContext.Provider
      value={{
        addCookies,
      }}
      {...props}
    />
  );
}

export function useCookies() {
  const context = React.useContext(CookiesContext);
  if (!context) {
    throw new Error("useCookie debe estar dentro del proveedor CookieContext");
  }
  return context;
}
