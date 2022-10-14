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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var layout_1 = require("@chakra-ui/layout");
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var react_feather_1 = require("react-feather");
var icons_1 = require("@chakra-ui/icons");
var react_redux_1 = require("react-redux");
var data_1 = require("../../../configs/data");
var filterUser_1 = require("../../../configs/filterUser");
var transformUser_1 = require("../../../configs/transformUser");
function Team(_a) {
    var _b, _c;
    var users = _a.users, setUsers = _a.setUsers, register = _a.register, setValue = _a.setValue, userDefaultValues = _a.userDefaultValues;
    var dispatch = react_redux_1.useDispatch();
    var _d = react_2.useState(null), userCheck = _d[0], setUserCheck = _d[1];
    var _e = react_2.useState(null), userForm = _e[0], setUserForm = _e[1];
    var _f = react_2.useState({}), flagUserCheck = _f[0], setFlagUserCheck = _f[1];
    var _g = react_2.useState({
        branch: { index: -1 },
        type: { index: -1 },
        level: { index: -1 },
        name: { nameString: "" }
    }), dataFilter = _g[0], setDataFilter = _g[1];
    // -1 if default check All
    var handleClickAdd = function (item) {
        //handle check userCheck
        if (!userCheck) {
            setUserCheck([item]);
            setFlagUserCheck({});
        }
        else {
            setUserCheck(__spreadArrays(userCheck, [item]));
            setFlagUserCheck({});
        }
        //handle check userForm
        if (!userForm) {
            setUserForm([{ userId: item.id, type: 1 }]);
        }
        else {
            setUserForm(__spreadArrays(userForm, [{ userId: item.id, type: 0 }]));
        }
    };
    var handleClickRemove = function (item) {
        //handle remove userCheck
        setUserCheck(transformUser_1.deleteArrInArrById(userCheck, [item]));
        setUsers(__spreadArrays(users, [item]));
        //handle remove userForm
        setUserForm(transformUser_1.deleteArrRemoveUserForm(userForm)(item.id));
    };
    react_2.useEffect(function () {
        if (userCheck) {
            setUsers(transformUser_1.deleteArrInArrById(users, userCheck));
        }
    }, [flagUserCheck, userCheck]);
    react_2.useEffect(function () {
        setValue("users", userForm);
    }, [userForm]);
    react_2.useEffect(function () {
        if (userDefaultValues) {
            setUserForm(userDefaultValues);
            setUserCheck(transformUser_1.getObjectById(userDefaultValues)(users));
            setFlagUserCheck({});
        }
    }, [userDefaultValues]);
    var handleChangeOffice = function (e, userId) {
        setUserForm(transformUser_1.mergeObjectUserForm(userForm)({ userId: userId, type: +e.target.value }));
    };
    var _h = react_2.useState(false), render = _h[0], setRender = _h[1];
    var handleRenderMembers = function () {
        setRender(true);
    };
    return (react_2["default"].createElement(layout_1.Box, { maxH: "500px", overflowY: "scroll" },
        react_2["default"].createElement(layout_1.Box, { mb: 2, fontWeight: "bold" }, "Selected Team Members"),
        react_2["default"].createElement(layout_1.Box, null, (_b = transformUser_1.mergeObjectById(userCheck)(userForm)) === null || _b === void 0 ? void 0 : _b.map(function (item, index) { return (react_2["default"].createElement(react_1.Flex, { key: index, align: "center", mb: 2 },
            react_2["default"].createElement(react_1.Flex, { boxSize: "30px", bgColor: "transparent", borderRadius: "50%", align: "center", justify: "center", 
                // mr={2}
                cursor: "pointer", onClick: function () { return handleClickRemove(item); } },
                react_2["default"].createElement(react_1.Icon, { w: 6, h: 6, color: "red", as: react_feather_1.X })),
            react_2["default"].createElement(layout_1.Box, { mx: 2 },
                react_2["default"].createElement(react_1.Text, { mr: 2 }, item.name),
                react_2["default"].createElement(layout_1.Box, { display: 'flex' },
                    react_2["default"].createElement(react_1.Text, { backgroundColor: "red.200", mr: 1, px: 2, borderRadius: '20px' }, data_1.checkLevel(item.level)),
                    react_2["default"].createElement(react_1.Text, { backgroundColor: "yellow.200", mr: 1, px: 2, borderRadius: '20px' }, data_1.checkBranch(item.branch)),
                    react_2["default"].createElement(react_1.Text, { backgroundColor: "green.200", mr: 1, px: 2, borderRadius: '20px' }, data_1.checkTypeUser(item.type)))),
            react_2["default"].createElement(react_1.Select, { w: "150px", onChange: function (e) { return handleChangeOffice(e, item.id); } },
                react_2["default"].createElement("option", { value: 0, selected: item.typeOffice === 0 }, "Member"),
                react_2["default"].createElement("option", { value: 1, selected: item.typeOffice === 1 }, "Project Manager"),
                react_2["default"].createElement("option", { value: 2, selected: item.typeOffice === 2 }, "Shadow"),
                react_2["default"].createElement("option", { value: 3, selected: item.typeOffice === 3 }, "Deactive")))); })),
        react_2["default"].createElement(layout_1.Divider, { mb: 2 }),
        react_2["default"].createElement(layout_1.Box, null,
            react_2["default"].createElement(layout_1.Box, { mb: 2, fontWeight: "bold" }, "Members List"),
            react_2["default"].createElement(react_1.Flex, { mb: 2 },
                react_2["default"].createElement(layout_1.Box, { mr: 2 },
                    react_2["default"].createElement(react_1.Text, { fontWeight: "bold" }, "Branch"),
                    react_2["default"].createElement(react_1.Select, { variant: 'flushed', onChange: function (e) {
                            setDataFilter(__assign(__assign({}, dataFilter), { branch: { index: +e.target.value } }));
                            setRender(true);
                        } },
                        react_2["default"].createElement("option", { value: -1 }, "All"),
                        data_1.dataBranch.map(function (branch, index) { return (react_2["default"].createElement("option", { value: branch.branch, key: index }, branch.name)); }))),
                react_2["default"].createElement(layout_1.Box, { mr: 2 },
                    react_2["default"].createElement(react_1.Text, { fontWeight: "bold" }, "Type"),
                    react_2["default"].createElement(react_1.Select, { variant: 'flushed', onChange: function (e) {
                            setDataFilter(__assign(__assign({}, dataFilter), { type: { index: +e.target.value } }));
                            setRender(true);
                        } },
                        react_2["default"].createElement("option", { value: -1 }, "All"),
                        data_1.dataTypeUser.map(function (data, index) { return (react_2["default"].createElement("option", { value: data.type, key: index }, data.name)); }))),
                react_2["default"].createElement(layout_1.Box, { mr: 2 },
                    react_2["default"].createElement(react_1.Text, { fontWeight: "bold" }, "Level"),
                    react_2["default"].createElement(react_1.Select, { variant: 'flushed', onChange: function (e) {
                            setDataFilter(__assign(__assign({}, dataFilter), { level: { index: +e.target.value } }));
                            setRender(true);
                        } },
                        react_2["default"].createElement("option", { value: -1 }, "All"),
                        data_1.dataLevel.map(function (data, index) { return (react_2["default"].createElement("option", { value: data.level, key: index }, data.name)); }))),
                react_2["default"].createElement(layout_1.Box, { mr: 2 },
                    react_2["default"].createElement(react_1.Text, { fontWeight: "bold" }, "Name"),
                    react_2["default"].createElement(react_1.Input, { variant: 'flushed', onChange: function (e) {
                            setDataFilter(__assign(__assign({}, dataFilter), { name: { nameString: e.target.value } }));
                            setRender(true);
                        } }))),
            react_2["default"].createElement(layout_1.Box, null,
                react_2["default"].createElement(react_1.Button, { mb: 4, leftIcon: react_2["default"].createElement(icons_1.RepeatIcon, null), colorScheme: 'teal', variant: 'solid', onClick: function () { return setRender(true); } }, "Show Members")),
            render ? (_c = filterUser_1.filterUser(users)(dataFilter.branch.index)(dataFilter.type.index)(dataFilter.level.index)(dataFilter.name.nameString)) === null || _c === void 0 ? void 0 : _c.map(function (item, index) { return (react_2["default"].createElement(react_1.Flex, { key: index, align: "center", mb: 2 },
                react_2["default"].createElement(react_1.Flex, { boxSize: "30px", bgColor: "transparent", borderRadius: "50%", align: "center", justify: "center", mr: 2, cursor: "pointer", onClick: function () { return handleClickAdd(item); } },
                    react_2["default"].createElement(react_1.Icon, { w: 6, h: 6, color: "blue.500", as: react_feather_1.Plus })),
                react_2["default"].createElement(react_1.Text, { mr: 2 }, item.name),
                react_2["default"].createElement(react_1.Text, { backgroundColor: "red.200", mr: 1, px: 2, borderRadius: '20px' }, data_1.checkLevel(item.level)),
                react_2["default"].createElement(react_1.Text, { backgroundColor: "yellow.200", mr: 1, px: 2, borderRadius: '20px' }, data_1.checkBranch(item.branch)),
                react_2["default"].createElement(react_1.Text, { backgroundColor: "green.200", mr: 1, px: 2, borderRadius: '20px' }, data_1.checkTypeUser(item.type)))); }) : '')));
}
exports["default"] = Team;
