"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var button_1 = require("@chakra-ui/button");
var form_control_1 = require("@chakra-ui/form-control");
var input_1 = require("@chakra-ui/input");
var layout_1 = require("@chakra-ui/layout");
var select_1 = require("@chakra-ui/select");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var hooks_1 = require("../../app/hooks");
var TaskSlice_1 = require("../../features/TaskSlice");
var StoreId_1 = require("../../features/StoreId");
function EditTask(_a) {
    var onClose = _a.onClose;
    var dispatch = hooks_1.useAppDispatch();
    var _b = react_1.useState({
        name: "",
        type: 0,
        isDeleted: false
    }), dataNewTask = _b[0], setDataNewTask = _b[1];
    var handleSubmitEdit = function (e) {
        e.preventDefault();
        dispatch(TaskSlice_1.newTask(dataNewTask));
        onClose();
    };
    var themeColor = react_redux_1.useSelector(StoreId_1.themeSelector).themeColor;
    return (react_1["default"].createElement(layout_1.Box, null,
        react_1["default"].createElement("form", { onSubmit: function (e) { return handleSubmitEdit(e); } },
            react_1["default"].createElement(form_control_1.FormControl, null,
                react_1["default"].createElement(form_control_1.FormLabel, null, "Name"),
                react_1["default"].createElement(input_1.Input, { name: "name", value: dataNewTask.name, onChange: function (e) {
                        var _a;
                        return setDataNewTask(__assign(__assign({}, dataNewTask), (_a = {}, _a[e.target.name] = e.target.value, _a)));
                    } }),
                react_1["default"].createElement(form_control_1.FormLabel, null, "Task Type"),
                react_1["default"].createElement(select_1.Select, { onChange: function (e) {
                        setDataNewTask(__assign(__assign({}, dataNewTask), { type: +e.target.value }));
                    } },
                    react_1["default"].createElement("option", { selected: (dataNewTask === null || dataNewTask === void 0 ? void 0 : dataNewTask.type) === 0, value: 0 }, "Common Task"),
                    react_1["default"].createElement("option", { selected: (dataNewTask === null || dataNewTask === void 0 ? void 0 : dataNewTask.type) === 1, value: 1 }, "Other Task")),
                react_1["default"].createElement(button_1.Button, { bgColor: themeColor ? themeColor : 'blue.400', color: 'white', mt: 2, type: "submit" }, "Save")))));
}
exports["default"] = EditTask;
