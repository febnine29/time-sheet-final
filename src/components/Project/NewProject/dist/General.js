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
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var react_datepicker_1 = require("react-datepicker");
require("react-datepicker/dist/react-datepicker.css");
var react_hook_form_1 = require("react-hook-form");
var DatePickerChakra = react_1.chakra(react_datepicker_1["default"]);
function General(_a) {
    var customer = _a.customer, register = _a.register, setValue = _a.setValue, control = _a.control;
    return (react_2["default"].createElement("div", null,
        react_2["default"].createElement(react_1.FormControl, { id: "client" },
            react_2["default"].createElement(react_1.FormLabel, null, "Client*"),
            react_2["default"].createElement(react_hook_form_1.Controller, { control: control, name: "customerId", render: function (_a) {
                    var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value, name = _b.name, ref = _b.ref, _c = _a.fieldState, invalid = _c.invalid, isTouched = _c.isTouched, isDirty = _c.isDirty, error = _c.error, formState = _a.formState;
                    return (react_2["default"].createElement(react_1.Select, { onChange: function (e) { return onChange(+e.target.value); }, onBlur: onBlur, placeholder: 'Select customer' }, customer === null || customer === void 0 ? void 0 : customer.map(function (item) { return (react_2["default"].createElement("option", { selected: value === item.id, value: item.id, key: item.id }, item.name)); })));
                } })),
        react_2["default"].createElement(react_1.FormControl, { id: "name" },
            react_2["default"].createElement(react_1.FormLabel, null, "Project Name*"),
            react_2["default"].createElement(react_1.Input, __assign({ type: "text" }, register("name")))),
        react_2["default"].createElement(react_1.FormControl, null,
            react_2["default"].createElement(react_1.FormLabel, { id: "code" }, "Project Code*"),
            react_2["default"].createElement(react_1.Input, __assign({ type: "text" }, register("code")))),
        react_2["default"].createElement(react_1.FormControl, { id: "date" },
            react_2["default"].createElement(react_1.FormLabel, null, "Dates*"),
            react_2["default"].createElement(react_1.Flex, null,
                react_2["default"].createElement(react_hook_form_1.Controller, { control: control, name: "timeStart", render: function (_a) {
                        var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value;
                        return (react_2["default"].createElement(DatePickerChakra, { border: "1px solid black", padding: 2, borderRadius: 5, selected: typeof value === "string" ? new Date(value) : value, onChange: onChange, onBlur: onBlur }));
                    } }),
                react_2["default"].createElement(react_hook_form_1.Controller, { control: control, name: "timeEnd", render: function (_a) {
                        var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value, ref = _b.ref;
                        return (react_2["default"].createElement(DatePickerChakra, { border: "1px solid black", padding: 2, borderRadius: 5, selected: typeof value === "string" ? new Date(value) : value, onChange: onChange, onBlur: onBlur }));
                    } }))),
        react_2["default"].createElement(react_1.FormControl, { id: "note" },
            react_2["default"].createElement(react_1.FormLabel, null, "Note*"),
            react_2["default"].createElement(react_1.Input, __assign({ type: "text" }, register("note")))),
        react_2["default"].createElement(react_1.Flex, { alignItems: "center", mt: 2, mb: 2 },
            react_2["default"].createElement(react_1.Checkbox, __assign({ mr: 2 }, register("isAllUserBelongTo"))),
            react_2["default"].createElement(react_1.Text, null,
                " ",
                "Auto add user as a member of this project when creating new user")),
        react_2["default"].createElement(react_1.FormControl, { id: "projectType" },
            react_2["default"].createElement(react_1.FormLabel, null, "Project Type*"),
            react_2["default"].createElement(react_1.Select, __assign({}, register("projectType", { valueAsNumber: true })),
                react_2["default"].createElement("option", { value: 0, defaultChecked: true }, "Time - Materials"),
                react_2["default"].createElement("option", { value: 1 }, "Fixed Fee"),
                react_2["default"].createElement("option", { value: 2 }, "Non-Billable"),
                react_2["default"].createElement("option", { value: 3 }, "ODC")))));
}
exports["default"] = react_2["default"].memo(General);
