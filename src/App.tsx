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
import {useSelector} from "react-redux";
import {authSelector} from "./features/AuthSlice"
function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      setToken(localStorage.getItem("accesstoken"));
      dispatch(getCurLoginInfo(getCurLoginInfoApi));
    }
  }, []);
  const auth = useSelector(authSelector)
  // if(!auth.isAuthenticate){
  //   return (
  //     <div className="content" style={{width: '60vw', height: '20vh', margin: '30vh auto', fontSize: '30px', fontWeight: 'bold', textAlign: 'center'}}>
  //       Checking Authentication...
  //     </div>
  //   ) 
  // }
  return (
    <Box className="App" w="100%" h="100vh">
      <Box display="flex" w="100%" h="100vh">
        <Routes>
          <Route path="/" element={
                <Box w="100%" h="100vh" className="app">
                  <Auth />
                </Box>} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Box w="100vw">
                  <Header />
                  <Box display="flex">
                    <Navbar />
                    <Home />
                  </Box>
                </Box>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Box w="100vw">
                  <Header />
                  <Box display="flex">
                    <Navbar />
                    <TaskManager/>
                  </Box>
                </Box>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Box w="100vw">
                  <Header />
                  <Box display="flex">
                    <Navbar />
                    <ProjectManager />
                  </Box>
                </Box>
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
