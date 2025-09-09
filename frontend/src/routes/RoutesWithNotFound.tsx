import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const RoutesWithNoFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
