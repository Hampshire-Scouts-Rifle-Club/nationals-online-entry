import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./AppPostal";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/logout" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
