import React, { Fragment, useLayoutEffect } from "react";
import Header from "./components/Common/Header";
import Navbar from "./components/Common/Navbar";
import "./App.css";
import { Box, Flex } from "@chakra-ui/layout";
import Home from "./layouts/Home";
import TaskManager from "./layouts/TaskManager";
import ProjectManager from "./layouts/ProjectManager";
import Auth from "./layouts/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { getCurLoginInfo } from "./features/AuthSlice";
import { getCurLoginInfoApi } from "./api/authapi";
import { useAppDispatch } from "./app/hooks";
import NotFound from "./components/Common/NotFound";
import setToken from "./configs/setToken";

function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      setToken(localStorage.getItem("accesstoken"));
      dispatch(getCurLoginInfo(getCurLoginInfoApi));
    }
  }, []);

  return (
    <Box className="App" w="100%">
      <Header />
      <Box display="flex">
        <Routes>
          <Route path="/account" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Navbar />
                <TaskManager/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Navbar />
                <ProjectManager />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
