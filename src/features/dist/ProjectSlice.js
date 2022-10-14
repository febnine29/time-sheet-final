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
var _a;
exports.__esModule = true;
exports.projectSelector = exports.setProjectEmtyl = exports.setMess = exports.getSingleProject = exports.saveProject = exports.deleteProject = exports.deActiveProject = exports.activeProject = exports.getAllProject = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var axios_1 = require("axios");
var projectapi_1 = require("../api/projectapi");
var initialState = {
    projectLoading: false,
    projects: null,
    project: null,
    message: {
        type: "success",
        mess: ""
    }
};
exports.getAllProject = toolkit_1.createAsyncThunk("project/getAll", function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, status, _c, search, response, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = data, _b = _a.status, status = _b === void 0 ? "" : _b, _c = _a.search, search = _c === void 0 ? "" : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].get(projectapi_1.getAllProjectApi + "?status=" + status + "&search=" + search)];
            case 2:
                response = _d.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_1 = _d.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.activeProject = toolkit_1.createAsyncThunk("project/activeProject", function (data, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            Promise.all(data.map(function (item) {
                return axios_1["default"]
                    .post(projectapi_1.activeProjectApi, { id: item.id })
                    .then(function (result) {
                    dispatch(exports.setMess({
                        type: "success",
                        mess: item.name + " DeActive Success"
                    }));
                })["catch"](function (error) {
                    dispatch(exports.setMess({ type: "error", mess: item.name + " DeActive Error" }));
                });
            }))
                .then(function (result) {
                dispatch(exports.getAllProject());
            })["catch"](function (error) { return console.log(error); });
            return [2 /*return*/];
        });
    });
});
exports.deActiveProject = toolkit_1.createAsyncThunk("project/deActiveProject", function (data, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            Promise.all(data.map(function (item) {
                return axios_1["default"]
                    .post(projectapi_1.inActiveProjectApi, { id: item.id })
                    .then(function (result) {
                    dispatch(exports.setMess({
                        type: "success",
                        mess: item.name + " DeActive Success"
                    }));
                })["catch"](function (error) {
                    dispatch(exports.setMess({ type: "error", mess: item.name + " DeActive Error" }));
                });
            }))
                .then(function (result) {
                dispatch(exports.getAllProject());
            })["catch"](function (error) { return console.log(error); });
            return [2 /*return*/];
        });
    });
});
exports.deleteProject = toolkit_1.createAsyncThunk("project/deActiveProject", function (data, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            Promise.all(data.map(function (item) {
                return axios_1["default"]["delete"](projectapi_1.deleteProjectApi + "?Id=" + item.id)
                    .then(function (result) {
                    dispatch(exports.setMess({
                        type: "success",
                        mess: "Delete " + item.name + " Success"
                    }));
                })["catch"](function (error) {
                    dispatch(exports.setMess({
                        type: "error",
                        mess: "Delete " + item.name + " Error"
                    }));
                });
            }))
                .then(function (result) {
                dispatch(exports.getAllProject());
            })["catch"](function (error) { return console.log(error); });
            return [2 /*return*/];
        });
    });
});
exports.saveProject = toolkit_1.createAsyncThunk("project/save", function (data, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post(projectapi_1.addProjectApi, data)];
                case 1:
                    response = _b.sent();
                    console.log(response);
                    dispatch(exports.getAllProject({ status: '', search: '' }));
                    dispatch(exports.setMess({
                        type: "success",
                        mess: "Save Project Success"
                    }));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    dispatch(exports.setMess({
                        type: "error",
                        mess: "Save Project Fail"
                    }));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.getSingleProject = toolkit_1.createAsyncThunk("project/getSingleProject", function (url, _a) {
    var dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(url)];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
});
var ProjectSlice = toolkit_1.createSlice({
    name: "project",
    initialState: initialState,
    reducers: {
        setMess: function (state, _a) {
            var payload = _a.payload;
            state.message.type = payload.type;
            state.message.mess = payload.mess;
        },
        setProjectEmtyl: function (state) {
            state.project = null;
        }
    },
    extraReducers: function (builder) {
        // get all project
        builder.addCase(exports.getAllProject.pending, function (state, action) {
            state.projectLoading = true;
        });
        builder.addCase(exports.getAllProject.fulfilled, function (state, _a) {
            var payload = _a.payload;
            state.projectLoading = false;
            state.projects = payload === null || payload === void 0 ? void 0 : payload.result;
        });
        builder.addCase(exports.getAllProject.rejected, function (state, action) {
            state.projectLoading = false;
        });
        // get single project
        builder.addCase(exports.getSingleProject.pending, function (state, action) {
            // state.projectLoading = true;
        });
        builder.addCase(exports.getSingleProject.fulfilled, function (state, _a) {
            var payload = _a.payload;
            // state.projectLoading = false;
            state.project = payload === null || payload === void 0 ? void 0 : payload.result;
        });
        builder.addCase(exports.getSingleProject.rejected, function (state, action) {
            // state.projectLoading = false;
        });
    }
});
exports.setMess = (_a = ProjectSlice.actions, _a.setMess), exports.setProjectEmtyl = _a.setProjectEmtyl;
exports.projectSelector = function (state) { return state.project; };
exports["default"] = ProjectSlice.reducer;
