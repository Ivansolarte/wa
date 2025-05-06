import { Routes, Route } from "react-router";
import { Dashboard } from "../pages/dashboard";
import { Headers } from "../components/headers/headers";
import { Summary } from "../components/home/summary";

export const RoutesPrivate = () => {
  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/graficas" element={<Summary/>} />
      </Routes>
    </div>
  );
};
