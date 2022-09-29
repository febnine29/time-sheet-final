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
          children) : (
    // <Navigate to="/login" state={location.pathname} />
    <div className="content" style={{width: '60vw', height: '20vh', margin: '30vh auto', fontSize: '30px', fontWeight: 'bold', textAlign: 'center'}}>
        Checking Authentication...
      </div>
  );
}
