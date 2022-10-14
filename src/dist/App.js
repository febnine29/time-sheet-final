"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.divide = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var Header_1 = require("./components/Common/Header");
var Navbar_1 = require("./components/Common/Navbar");
require("./App.css");
var layout_1 = require("@chakra-ui/layout");
var Home_1 = require("./layouts/Home");
var TaskManager_1 = require("./layouts/TaskManager");
var ProjectManager_1 = require("./layouts/ProjectManager");
var Auth_1 = require("./layouts/Auth");
var TestPage_1 = require("./layouts/TestPage");
var ProtectedRoute_1 = require("./routes/ProtectedRoute");
var react_router_dom_1 = require("react-router-dom");
var AuthSlice_1 = require("./features/AuthSlice");
var authapi_1 = require("./api/authapi");
var hooks_1 = require("./app/hooks");
var NotFound_1 = require("./components/Common/NotFound");
var setToken_1 = require("./configs/setToken");
var react_redux_1 = require("react-redux");
var AuthSlice_2 = require("./features/AuthSlice");
var TaskSlice_1 = require("./features/TaskSlice");
var StoreId_1 = require("./features/StoreId");
var index_1 = require("./api/index");
// -------------Testing Learning---------------
function divide(a, b) {
    // Sure, we cannot divide by 0,
    // so in this case we will throw an error.
    if (b === 0) {
        throw new Error("You can't divide by zero.");
    }
    // If everything is okay, we will return
    // a round division result.
    return Math.round(a / b);
}
exports.divide = divide;
function App() {
    var _this = this;
    var dispatch = hooks_1.useAppDispatch();
    react_1.useLayoutEffect(function () {
        if (localStorage.getItem("accesstoken")) {
            setToken_1["default"](localStorage.getItem("accesstoken"));
            dispatch(AuthSlice_1.getCurLoginInfo(authapi_1.getCurLoginInfoApi));
        }
    }, []);
    var auth = react_redux_1.useSelector(AuthSlice_2.authSelector);
    // if(!auth.isAuthenticate){
    //   return (
    //     <div className="content" style={{width: '60vw', height: '20vh', margin: '30vh auto', fontSize: '30px', fontWeight: 'bold', textAlign: 'center'}}>
    //       Checking Authentication...
    //     </div>
    //   ) 
    // }
    var getUser = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(index_1.url + "/api/services/app/User/GetUserNotPagging")];
                case 1:
                    response = _a.sent();
                    dispatch(StoreId_1.storeUsers(response.data.result));
                    return [2 /*return*/];
            }
        });
    }); };
    var getCustomer = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(index_1.url + "/api/services/app/Customer/GetAll")];
                case 1:
                    response = _a.sent();
                    dispatch(StoreId_1.storeCustomers(response.data.result));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getUser();
        getCustomer();
        dispatch(TaskSlice_1.getAllTask());
    });
    return (react_1["default"].createElement(layout_1.Box, { className: "App", w: "100%", h: "100vh" },
        react_1["default"].createElement(layout_1.Box, { display: "flex", w: "100%", h: "100vh" },
            react_1["default"].createElement(react_router_dom_1.Routes, null,
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(layout_1.Box, { w: "100%", h: "100vh", className: "app" },
                        react_1["default"].createElement(Auth_1["default"], null)) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/test-page", element: react_1["default"].createElement(layout_1.Box, { w: "100%", h: "100vh", className: "app" },
                        react_1["default"].createElement(TestPage_1["default"], null)) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/home", element: react_1["default"].createElement(ProtectedRoute_1["default"], null,
                        react_1["default"].createElement(layout_1.Box, { w: "100vw" },
                            react_1["default"].createElement(Header_1["default"], null),
                            react_1["default"].createElement(layout_1.Box, { display: "flex" },
                                react_1["default"].createElement(Navbar_1["default"], null),
                                react_1["default"].createElement(Home_1["default"], null)))) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/tasks", element: react_1["default"].createElement(ProtectedRoute_1["default"], null,
                        react_1["default"].createElement(layout_1.Box, { w: "100vw" },
                            react_1["default"].createElement(Header_1["default"], null),
                            react_1["default"].createElement(layout_1.Box, { display: "flex" },
                                react_1["default"].createElement(Navbar_1["default"], null),
                                react_1["default"].createElement(TaskManager_1["default"], null)))) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/projects", element: react_1["default"].createElement(ProtectedRoute_1["default"], null,
                        react_1["default"].createElement(layout_1.Box, { w: "100vw" },
                            react_1["default"].createElement(Header_1["default"], null),
                            react_1["default"].createElement(layout_1.Box, { display: "flex" },
                                react_1["default"].createElement(Navbar_1["default"], null),
                                react_1["default"].createElement(ProjectManager_1["default"], null)))) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement(NotFound_1["default"], null) })))));
}
exports["default"] = App;
