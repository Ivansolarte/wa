import { Routes, Route } from "react-router";
import { Login } from "../components/login/login";

export const RoutesPublic = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login/>} />
    </Routes>
  );
};
