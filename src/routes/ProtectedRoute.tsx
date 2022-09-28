import { Spinner } from "@chakra-ui/spinner";
import * as React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { authSelector } from "../features/AuthSlice";

export interface ProtectedRouteProps {}

export default function ProtectedRoute({ children }: any) {
  const { authLoading, isAuthenticate } = useAppSelector(authSelector);
  const location = useLocation();

  return isAuthenticate ? (
    children
  ) : (
    <Navigate to="/account" state={location.pathname} />
  );
}
