"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../app/hooks");
var setToken_1 = require("../../configs/setToken");
var AuthSlice_1 = require("../../features/AuthSlice");
var ProjectSlice_1 = require("../../features/ProjectSlice");
var TaskSlice_1 = require("../../features/TaskSlice");
var StoreId_1 = require("../../features/StoreId");
var nccsoft_vietnam_logo_png_1 = require("../../images/nccsoft_vietnam_logo.png");
var react_redux_1 = require("react-redux");
function Navbar(props) {
    var dispatch = hooks_1.useAppDispatch();
    var projectLoading = react_redux_1.useSelector(ProjectSlice_1.projectSelector).projectLoading;
    var taskLoading = react_redux_1.useSelector(TaskSlice_1.taskSelector).taskLoading;
    var themeColor = react_redux_1.useSelector(StoreId_1.themeSelector).themeColor;
    var userInfo = hooks_1.useAppSelector(AuthSlice_1.authSelector).userInfo;
    var _a = react_1.useDisclosure(), isOpen = _a.isOpen, onToggle = _a.onToggle;
    var handleLogout = function () {
        dispatch(AuthSlice_1.logout());
        setToken_1["default"](null);
        dispatch(AuthSlice_1.removeTokenLocalStorage());
    };
    return (react_2["default"].createElement(react_1.Box, { height: "100vh", width: '356px', padding: 5 },
        react_2["default"].createElement(react_1.Box, { pt: 10 },
            react_2["default"].createElement(react_1.Flex, { justifyContent: "start", alignItems: 'center' },
                react_2["default"].createElement(react_1.Avatar, { src: nccsoft_vietnam_logo_png_1["default"], mr: 5, bg: 'white', borderRadius: '50%', boxShadow: "-0px 0px 2px #b8b8b8, 0px 0px 0px 2px #ffffff, 5px 2px 8px #717171" }),
                react_2["default"].createElement(react_1.Box, { mb: 3, pt: 2 },
                    react_2["default"].createElement(react_1.Text, { color: "gray.600", fontWeight: 'bold' }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.userName),
                    react_2["default"].createElement(react_1.Text, { color: "gray.600", fontStyle: 'italic' }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.emailAddress))),
            react_2["default"].createElement(react_1.Flex, { justifyContent: "center", mt: 'auto', bg: 'none' },
                react_2["default"].createElement(react_1.Button, { size: "sm", colorScheme: "red", ml: 'auto', onClick: handleLogout }, "Logout")),
            react_2["default"].createElement(react_1.Divider, { mt: 5 })),
        react_2["default"].createElement(react_1.Flex, { flexDirection: "column", justifySelf: "flex-start" },
            react_2["default"].createElement(react_router_dom_1.Link, { to: "/home" },
                react_2["default"].createElement(react_1.Flex, { padding: 3, alignItems: "center", _hover: { bgColor: "gray.200" }, cursor: "pointer" }, "Home"),
                react_2["default"].createElement(react_1.Divider, null)),
            react_2["default"].createElement(react_router_dom_1.Link, { to: "/tasks" },
                react_2["default"].createElement(react_1.Flex, { padding: 3, alignItems: "center", _hover: { bgColor: "gray.200" }, cursor: "pointer" },
                    "Tasks Manager",
                    react_2["default"].createElement(react_1.Box, { ml: "auto", height: '24px' }, taskLoading &&
                        react_2["default"].createElement(react_1.Spinner, { thickness: '4px', speed: '0.5s', color: themeColor ? themeColor : 'blue.400', size: 'md' }))),
                react_2["default"].createElement(react_1.Divider, null)),
            react_2["default"].createElement(react_router_dom_1.Link, { to: "/projects" },
                react_2["default"].createElement(react_1.Flex, { padding: 3, alignItems: "center", _hover: { bgColor: "gray.100" }, cursor: "pointer" },
                    "Projects Manager",
                    react_2["default"].createElement(react_1.Box, { ml: "auto", height: '24px' }, projectLoading &&
                        react_2["default"].createElement(react_1.Spinner, { thickness: '4px', speed: '0.5s', color: themeColor ? themeColor : 'blue.400', size: 'md' }))),
                react_2["default"].createElement(react_1.Divider, null)),
            react_2["default"].createElement(react_1.Divider, null))));
}
exports["default"] = Navbar;
