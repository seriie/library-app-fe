import { createContext, useContext } from "react";

export const RoleContext = createContext(undefined);

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used inside RoleProvider");
  }
  return ctx;
};