import React, { Fragment, useEffect,useState, useLayoutEffect } from "react";
import axios from 'axios'
import Header from "./components/Common/Header";
import Navbar from "./components/Common/Navbar";
import "./App.css";
import { Box, Flex } from "@chakra-ui/layout";
import Home from "./layouts/Home";
import TaskManager from "./layouts/TaskManager";
import ProjectManager from "./layouts/ProjectManager";
import Auth from "./layouts/Auth";
import TestPage from "./layouts/TestPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { getCurLoginInfo } from "./features/AuthSlice";
import { getCurLoginInfoApi } from "./api/authapi";
import { useAppDispatch } from "./app/hooks";
import NotFound from "./components/Common/NotFound";
import setToken from "./configs/setToken";
import {useSelector} from "react-redux";
import {authSelector} from "./features/AuthSlice";
import {getAllTask} from './features/TaskSlice'
import {Customer} from './type/Customer';
import {UserNotPagging} from './type/User';
import { storeUsers, storeCustomers } from "./features/StoreId";
import {url} from './api/index'

// -------------Testing Learning---------------
export function divide(a: number, b: number): number {
  
  // Sure, we cannot divide by 0,
  // so in this case we will throw an error.
  if (b === 0) {
    throw new Error("You can't divide by zero.");
  }
  
  // If everything is okay, we will return
  // a round division result.
  return Math.round(a / b);
}
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
  const getUser = async () => {
    const response = await axios.get(`${url}/api/services/app/User/GetUserNotPagging`);
    dispatch(storeUsers(response.data.result));
  };

  const getCustomer = async () => {
    const response = await axios.get(`${url}/api/services/app/Customer/GetAll`);
    dispatch(storeCustomers(response.data.result));
  };
  useEffect(() => {
    getUser();
    getCustomer();
    dispatch(getAllTask());
  })

  
  return (
    <Box className="App" w="100%" h="100vh">
      <Box display="flex" w="100%" h="100vh">
        <Routes>
          <Route path="/" element={
                <Box w="100%" h="100vh" className="app">
                  <Auth />
                </Box>} />
          <Route path="/test-page" element={
                <Box w="100%" h="100vh" className="app">
                  <TestPage />
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
