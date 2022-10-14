"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var yup_1 = require("@hookform/resolvers/yup");
var react_2 = require("react");
var react_hook_form_1 = require("react-hook-form");
var yup = require("yup");
var hooks_1 = require("../../../app/hooks");
var react_redux_1 = require("react-redux");
var ProjectSlice_1 = require("../../../features/ProjectSlice");
var TaskSlice_1 = require("../../../features/TaskSlice");
var StoreId_1 = require("../../../features/StoreId");
var General_1 = require("./General");
var Tasks_1 = require("./Tasks");
var Team_1 = require("./Team");
function SaveProject(_a) {
    var TYPE_SAVE = _a.TYPE_SAVE, onClose = _a.onClose, defaultValues = _a.defaultValues;
    //Hook ChakraUi
    var toast = react_1.useToast();
    //Redux
    var dispatch = hooks_1.useAppDispatch();
    var message = hooks_1.useAppSelector(ProjectSlice_1.projectSelector).message;
    var tasks = hooks_1.useAppSelector(TaskSlice_1.taskSelector).tasks;
    //
    var _b = react_2.useState(null), customer = _b[0], setCustomer = _b[1];
    var _c = react_2.useState(null), users = _c[0], setUsers = _c[1];
    var schema = yup
        .object({
        name: yup.string().min(1).max(50).required(),
        code: yup.string().min(1).max(50).required(),
        timeStart: yup.date().required(),
        timeEnd: yup.date().required(),
        note: yup.string().required(),
        tasks: yup.array().required(),
        users: yup.array().required()
    })
        .required();
    var _d = react_hook_form_1.useForm({
        defaultValues: defaultValues || {
            projectTargetUsers: [],
            isAllUserBelongTo: false
        },
        resolver: yup_1.yupResolver(schema)
    }), register = _d.register, handleSubmit = _d.handleSubmit, setValue = _d.setValue, errors = _d.formState.errors, getValues = _d.getValues, control = _d.control;
    // handle funtion onSubmit by type Save
    var onSubmit = handleSubmit(function (data) {
        dispatch(ProjectSlice_1.saveProject(data));
        onClose();
    });
    // Show toast error
    var showErrorIndexOne = function (errors) {
        var errorIndexOne = errors[Object.keys(errors)[0]];
        if (!Array.isArray(errorIndexOne)) {
            return errorIndexOne === null || errorIndexOne === void 0 ? void 0 : errorIndexOne.message;
        }
        return null;
    };
    react_2.useEffect(function () {
        if (errors[Object.keys(errors)[0]]) {
            if (showErrorIndexOne(errors)) {
                toast({
                    title: showErrorIndexOne(errors),
                    status: "error",
                    isClosable: true,
                    duration: 2000,
                    position: "bottom-right"
                });
            }
        }
    }, [errors]);
    if (message.mess) {
        toast({
            title: message.mess,
            status: message.type,
            isClosable: true,
            duration: 2000,
            position: "bottom-right"
        });
        dispatch(TaskSlice_1.setMess({ mess: "", type: "success" }));
    }
    var getCustomers = react_redux_1.useSelector(StoreId_1.customerSelector);
    var getUsers = react_redux_1.useSelector(StoreId_1.userSelector);
    console.log('user---', getUsers);
    react_2.useEffect(function () {
        setCustomer(getCustomers.customers);
        setUsers(getUsers.users);
    }, []);
    var themeColor = react_redux_1.useSelector(StoreId_1.themeSelector).themeColor;
    return (react_2["default"].createElement(react_1.Tabs, null,
        react_2["default"].createElement("form", { onSubmit: onSubmit },
            react_2["default"].createElement(react_1.TabList, null,
                react_2["default"].createElement(react_1.Tab, null, "General"),
                react_2["default"].createElement(react_1.Tab, null, "Team"),
                react_2["default"].createElement(react_1.Tab, null, "Tasks")),
            react_2["default"].createElement(react_1.TabPanels, null,
                react_2["default"].createElement(react_1.TabPanel, null,
                    react_2["default"].createElement(General_1["default"], { customer: customer, register: register, setValue: setValue, control: control })),
                react_2["default"].createElement(react_1.TabPanel, null, users && (react_2["default"].createElement(Team_1["default"], { users: users, setUsers: setUsers, register: register, setValue: setValue, userDefaultValues: defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.users }))),
                react_2["default"].createElement(react_1.TabPanel, null, tasks && (react_2["default"].createElement(Tasks_1["default"], { tasks: tasks, setValue: setValue, taskDefaultValue: defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.tasks })))),
            react_2["default"].createElement(react_1.Button, { bgColor: themeColor ? themeColor : 'blue.400', color: 'white', type: "submit" }, "Save"))));
}
exports["default"] = SaveProject;
