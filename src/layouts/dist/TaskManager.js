"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var react_feather_1 = require("react-feather");
var hooks_1 = require("../app/hooks");
var react_redux_1 = require("react-redux");
var CommonTask_1 = require("../components/Task/CommonTask");
var EditTask_1 = require("../components/Task/EditTask");
var Modal_1 = require("../components/Common/Modal");
var OtherTask_1 = require("../components/Task/OtherTask");
var TaskSlice_1 = require("../features/TaskSlice");
var NewTask_1 = require("../components/Task/NewTask");
var StoreId_1 = require("../features/StoreId");
function TaskManager(props) {
    var toast = react_1.useToast();
    var dispatch = hooks_1.useAppDispatch();
    var _a = hooks_1.useAppSelector(TaskSlice_1.taskSelector), tasks = _a.tasks, taskLoading = _a.taskLoading, message = _a.message;
    react_2.useEffect(function () {
        dispatch(TaskSlice_1.getAllTask());
    }, []);
    var _b = react_2.useState(null), taskEdit = _b[0], setTaskEdit = _b[1];
    // Modal
    var _c = react_1.useDisclosure(), isOpenEdit = _c.isOpen, onOpenEdit = _c.onOpen, onCloseEdit = _c.onClose;
    var _d = react_1.useDisclosure(), isOpenAdd = _d.isOpen, onOpenAdd = _d.onOpen, onCloseAdd = _d.onClose;
    var handleClickEdit = function (task) {
        setTaskEdit(task);
        onOpenEdit();
    };
    var themeColor = react_redux_1.useSelector(StoreId_1.themeSelector).themeColor;
    if (message.mess) {
        console.log("oke set toast");
        toast({
            title: message.mess,
            status: message.type,
            isClosable: true,
            duration: 2000,
            position: "bottom-right"
        });
        dispatch(TaskSlice_1.setMess({ mess: "", type: "success" }));
    }
    return (react_2["default"].createElement(react_1.Box, { width: "100%", maxW: "1200px", mr: '1rem' },
        react_2["default"].createElement(Modal_1["default"], { title: "Edit Task", isOpen: isOpenEdit, onClose: onCloseEdit, onOpen: onOpenEdit, component: react_2["default"].createElement(EditTask_1["default"], { taskEdit: taskEdit, onClose: onCloseEdit }) }),
        react_2["default"].createElement(Modal_1["default"], { title: "Add New Task", isOpen: isOpenAdd, onClose: onCloseAdd, onOpen: onOpenAdd, component: react_2["default"].createElement(NewTask_1["default"], { onClose: onCloseAdd }) }),
        react_2["default"].createElement(react_1.Box, null,
            react_2["default"].createElement(react_1.Flex, { justifyContent: "space-around", alignItems: "center", mt: 5 },
                react_2["default"].createElement(react_1.Button, { leftIcon: react_2["default"].createElement(react_feather_1.Plus, null), bgColor: themeColor ? themeColor : 'blue.400', color: 'white', onClick: onOpenAdd }, "New Task"))),
        taskLoading && react_2["default"].createElement(react_1.Spinner, { thickness: '4px', speed: '0.65s', emptyColor: 'gray.200', color: themeColor ? themeColor : 'blue.400', size: 'lg' }),
        react_2["default"].createElement(CommonTask_1["default"], { handleClickEdit: handleClickEdit, tasks: tasks }),
        react_2["default"].createElement(OtherTask_1["default"], { handleClickEdit: handleClickEdit, tasks: tasks })));
}
exports["default"] = TaskManager;
