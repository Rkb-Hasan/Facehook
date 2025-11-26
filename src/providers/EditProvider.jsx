import { useState } from "react";
import { EditContext } from "../context";

export default function EditProvider({ children }) {
  const [editPost, setEditPost] = useState({});

  return (
    <EditContext.Provider value={{ editPost, setEditPost }}>
      {children}
    </EditContext.Provider>
  );
}
