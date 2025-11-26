import { useContext } from "react";
import { EditContext } from "../context";

export const useEditPost = () => {
  return useContext(EditContext);
};
