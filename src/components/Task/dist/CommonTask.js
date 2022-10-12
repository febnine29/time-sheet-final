"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var react_3 = require("react");
var hooks_1 = require("../../app/hooks");
var react_window_1 = require("react-window");
var react_virtualized_auto_sizer_1 = require("react-virtualized-auto-sizer");
var TaskSlice_1 = require("../../features/TaskSlice");
var react_redux_1 = require("react-redux");
var AlertReducer_1 = require("../../features/AlertReducer");
function CommonTask(_a) {
    var tasks = _a.tasks, handleClickEdit = _a.handleClickEdit;
    var ref = react_3.useRef(null);
    var _b = react_1.useDisclosure(), isOpenDelete = _b.isOpen, onOpenDelete = _b.onOpen, onCloseDelete = _b.onClose;
    var _c = react_1.useDisclosure(), isOpenAr = _c.isOpen, onOpenAr = _c.onOpen, onCloseAr = _c.onClose;
    var _d = react_1.useDisclosure(), isOpenUn = _d.isOpen, onOpenUn = _d.onOpen, onCloseUn = _d.onClose;
    var cancelRef = react_3.useRef(null);
    var dispatch = hooks_1.useAppDispatch();
    var dataAlert = react_redux_1.useSelector(AlertReducer_1.alertSelector);
    var taskName = dataAlert.task.name;
    var taskId = dataAlert.task.id;
    var _e = react_3.useState(undefined), taskList = _e[0], setTaskList = _e[1];
    react_3.useEffect(function () {
        setTaskList(tasks);
    });
    // const id = taskId
    var handleDeleteTask = function () {
        dispatch(TaskSlice_1.deleteTask(taskId));
        onCloseDelete();
    };
    var handleArchive = function () {
        dispatch(TaskSlice_1.archiveTask(taskId));
        onCloseAr();
    };
    var handleDeArchive = function () {
        dispatch(TaskSlice_1.deArchiveTask({ id: taskId }));
        onCloseUn();
    };
    var commonTask = taskList === null || taskList === void 0 ? void 0 : taskList.filter(function (task) { return task.type === 0; });
    // console.log('commontask',commonTask)
    var Row = function (_a) {
        var index = _a.index, key = _a.key, style = _a.style;
        return (react_2["default"].createElement("div", null,
            react_2["default"].createElement("div", { key: key, style: style, className: "post" },
                react_2["default"].createElement(react_2["default"].Fragment, null,
                    react_2["default"].createElement(react_1.Flex, { justifyContent: "space-between", alignItems: "center", key: key },
                        react_2["default"].createElement(react_1.Button, { colorScheme: "blue", size: "sm", onClick: function () { return handleClickEdit(commonTask[index]); } }, "Edit"),
                        react_2["default"].createElement(react_1.Text, { bg: 'none', mr: 'auto', ml: '10px' }, commonTask[index].name),
                        react_2["default"].createElement(react_1.Box, null,
                            commonTask[index].isDeleted ? (react_2["default"].createElement(react_1.Button, { colorScheme: "orange", size: "sm", onClick: function () {
                                    dispatch(AlertReducer_1.storeId(commonTask[index]));
                                    onOpenUn();
                                } }, "Unarchive")) : (react_2["default"].createElement(react_1.Button, { colorScheme: "orange", size: "sm", onClick: function () {
                                    dispatch(AlertReducer_1.storeId(commonTask[index]));
                                    onOpenAr();
                                } }, "Archive")),
                            react_2["default"].createElement(react_1.Button, { colorScheme: "red", size: "sm", ml: 2, isDisabled: !commonTask[index].isDeleted, onClick: function () {
                                    dispatch(AlertReducer_1.storeId(commonTask[index]));
                                    onOpenDelete();
                                } }, "Delete"))),
                    react_2["default"].createElement(react_1.Divider, { mt: 2, mb: 2 })))));
    };
    return (react_2["default"].createElement(react_1.Box, { height: '550px' },
        react_2["default"].createElement(react_1.Heading, { fontSize: 30, my: 5 },
            "Common Tasks (", tasks === null || tasks === void 0 ? void 0 :
            tasks.filter(function (task) { return task.type === 0; }).length,
            ")"),
        react_2["default"].createElement(react_virtualized_auto_sizer_1["default"], null, function (_a) {
            var height = _a.height, width = _a.width;
            return (react_2["default"].createElement(react_window_1.FixedSizeList, { height: 500, width: width, itemCount: commonTask === null || commonTask === void 0 ? void 0 : commonTask.length, itemSize: 50 }, Row));
        }),
        react_2["default"].createElement(react_1.Box, { maxHeight: '60vh', overflowY: "scroll", ref: ref }),
        react_2["default"].createElement(react_1.AlertDialog, { motionPreset: 'slideInBottom', isOpen: isOpenDelete, leastDestructiveRef: cancelRef, onClose: onCloseDelete },
            react_2["default"].createElement(react_1.AlertDialogOverlay, null,
                react_2["default"].createElement(react_1.AlertDialogContent, null,
                    react_2["default"].createElement(react_1.AlertDialogHeader, { fontSize: 'lg', fontWeight: 'bold', display: 'flex' },
                        "Delete Task:",
                        react_2["default"].createElement(react_1.Text, { pl: '5', fontStyle: 'italic' }, taskName)),
                    react_2["default"].createElement(react_1.AlertDialogBody, null, "Are you sure? You can't undo this action afterwards."),
                    react_2["default"].createElement(react_1.AlertDialogFooter, null,
                        react_2["default"].createElement(react_1.Button, { ref: cancelRef, onClick: onCloseDelete }, "Cancel"),
                        react_2["default"].createElement(react_1.Button, { colorScheme: 'red', onClick: handleDeleteTask, ml: 3 }, "Delete"))))),
        react_2["default"].createElement(react_1.AlertDialog, { motionPreset: 'slideInBottom', isOpen: isOpenAr, leastDestructiveRef: cancelRef, onClose: onCloseAr },
            react_2["default"].createElement(react_1.AlertDialogOverlay, null,
                react_2["default"].createElement(react_1.AlertDialogContent, null,
                    react_2["default"].createElement(react_1.AlertDialogHeader, { fontSize: 'lg', fontWeight: 'bold', display: 'flex' },
                        "Archive Task:",
                        react_2["default"].createElement(react_1.Text, { pl: '5', fontStyle: 'italic' }, taskName)),
                    react_2["default"].createElement(react_1.AlertDialogBody, null, "Are you sure? You can't undo this action afterwards."),
                    react_2["default"].createElement(react_1.AlertDialogFooter, null,
                        react_2["default"].createElement(react_1.Button, { ref: cancelRef, onClick: onCloseAr }, "Cancel"),
                        react_2["default"].createElement(react_1.Button, { colorScheme: 'red', onClick: handleArchive, ml: 3 }, "Archive"))))),
        react_2["default"].createElement(react_1.AlertDialog, { motionPreset: 'slideInBottom', isOpen: isOpenUn, leastDestructiveRef: cancelRef, onClose: onCloseUn },
            react_2["default"].createElement(react_1.AlertDialogOverlay, null,
                react_2["default"].createElement(react_1.AlertDialogContent, null,
                    react_2["default"].createElement(react_1.AlertDialogHeader, { fontSize: 'lg', fontWeight: 'bold', display: 'flex' },
                        "Archive Task:",
                        react_2["default"].createElement(react_1.Text, { pl: '5', fontStyle: 'italic' }, taskName)),
                    react_2["default"].createElement(react_1.AlertDialogBody, null, "Are you sure? You can't undo this action afterwards."),
                    react_2["default"].createElement(react_1.AlertDialogFooter, null,
                        react_2["default"].createElement(react_1.Button, { ref: cancelRef, onClick: onCloseUn }, "Cancel"),
                        react_2["default"].createElement(react_1.Button, { colorScheme: 'red', onClick: handleDeArchive, ml: 3 }, "Unarchive")))))));
}
exports["default"] = CommonTask;
