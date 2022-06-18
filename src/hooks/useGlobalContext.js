import { useContext } from "react";
import { AppContext } from "../config/context";
export const useGlobalContext = () => {
  return useContext(AppContext);
};
