"use strict";
exports.__esModule = true;
var react_menu_1 = require("@szhsin/react-menu");
require("@szhsin/react-menu/dist/index.css");
require("@szhsin/react-menu/dist/transitions/slide.css");
var dayjs_1 = require("dayjs");
var Feather = require("react-feather");
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var hooks_1 = require("../app/hooks");
var ProjectSlice_1 = require("../features/ProjectSlice");
var projectapi_1 = require("../api/projectapi");
var StoreId_1 = require("../features/StoreId");
var transformProject_1 = require("../configs/transformProject");
var react_feather_1 = require("react-feather");
var Modal_1 = require("../components/Common/Modal");
var NewProject_1 = require("../components/Project/NewProject");
var EditProject_1 = require("../components/Project/EditProject");
var FilterProject_1 = require("../components/Project/FilterProject");
var useDebounce_1 = require("../customHooks/useDebounce");
var StoreId_2 = require("../features/StoreId");
function ProjectManager(props) {
    var _a;
    //Chakraui
    var toast = react_1.useToast();
    var _b = react_1.useDisclosure(), isOpenNewProject = _b.isOpen, onOpenNewProject = _b.onOpen, onCloseNewProject = _b.onClose;
    var _c = react_1.useDisclosure(), isOpenEditProject = _c.isOpen, onOpenEditProject = _c.onOpen, onCloseEditProject = _c.onClose;
    //Redux
    var dispatch = hooks_1.useAppDispatch();
    var _d = hooks_1.useAppSelector(ProjectSlice_1.projectSelector), projectLoading = _d.projectLoading, projects = _d.projects, message = _d.message;
    // React Hook
    // const [projects, setProjects] = useState<ResultResponseGetAllProject | null>(null)
    var _e = react_2.useState([]), projectCheck = _e[0], setProjectCheck = _e[1];
    var _f = react_2.useState(null), currentProject = _f[0], setCurrentProject = _f[1];
    // console.log('currentProject', projectCheck)
    var _g = react_2.useState(""), currentStatusFilter = _g[0], setCurrentStatusFilter = _g[1];
    var _h = react_2.useState(""), inputFilter = _h[0], setInputFilter = _h[1];
    if (message.mess) {
        console.log("oke set toast");
        toast({
            title: message.mess,
            status: message.type,
            isClosable: true,
            duration: 3000,
            position: "bottom-right"
        });
        dispatch(ProjectSlice_1.setMess({ mess: "", type: "success" }));
    }
    // Filter project
    var valueDebounce = useDebounce_1["default"](inputFilter, 700);
    react_2.useEffect(function () {
        dispatch(ProjectSlice_1.getAllProject({ status: currentStatusFilter, search: valueDebounce }));
    }, [valueDebounce]);
    var handleOnchangeOptionFilter = function (e) {
        setCurrentStatusFilter(e.target.value);
        console.log('current status', currentStatusFilter, 'etarget', e.target.value);
        if (!e.target.value) {
            dispatch(ProjectSlice_1.getAllProject({ status: "", search: inputFilter }));
        }
        else {
            dispatch(ProjectSlice_1.getAllProject({ status: e.target.value, search: inputFilter }));
        }
    };
    var handleOnChangeInputFilter = function (e) {
        setInputFilter(e.target.value);
    };
    // console.log('current status after', currentStatusFilter, 'etarget after', e.target.value)
    var _j = react_1.useDisclosure(), isOpenDel = _j.isOpen, onOpenDel = _j.onOpen, onCloseDel = _j.onClose;
    var _k = react_1.useDisclosure(), isOpenActive = _k.isOpen, onOpenActive = _k.onOpen, onCloseActive = _k.onClose;
    var _l = react_1.useDisclosure(), isOpenUnactive = _l.isOpen, onOpenUnactive = _l.onOpen, onCloseUnactive = _l.onClose;
    var cancelRef = react_2.useRef(null);
    var getId = react_redux_1.useSelector(StoreId_1.idSelector);
    // const getProject = useSelector(projectSelector)
    var handleDelete = function () {
        axios_1["default"]["delete"](projectapi_1.deleteProjectApi + "?Id=" + getId.pId.id)
            .then(function (response) {
            toast({
                title: "Delete Project " + getId.pId.name + " Success",
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
                isClosable: true
            });
            dispatch(ProjectSlice_1.getAllProject({ status: "", search: inputFilter }));
        })["catch"](function (error) {
            toast({
                title: "Delete Project " + getId.pId.name + " Failed",
                status: 'error',
                position: 'bottom-right',
                duration: 2000,
                isClosable: true
            });
        });
        onCloseDel();
    };
    var handleActive = function () {
        axios_1["default"].post("" + projectapi_1.activeProjectApi, { id: getId.pId.id })
            .then(function (response) {
            toast({
                title: "Active Project " + getId.pId.name + " Success",
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
                isClosable: true
            });
            dispatch(ProjectSlice_1.getAllProject({ status: currentStatusFilter, search: inputFilter }));
        })["catch"](function (error) {
            toast({
                title: "Active Project " + getId.pId.name + " Failed",
                status: 'error',
                position: 'bottom-right',
                duration: 2000,
                isClosable: true
            });
        });
        onCloseActive();
    };
    var handleUnActive = function () {
        axios_1["default"].post("" + projectapi_1.inActiveProjectApi, { id: getId.pId.id })
            .then(function (response) {
            toast({
                title: "Unactive Project " + getId.pId.name + " Success",
                status: 'success',
                position: 'bottom-right',
                duration: 2000,
                isClosable: true
            });
            dispatch(ProjectSlice_1.getAllProject({ status: currentStatusFilter, search: inputFilter }));
        })["catch"](function (error) {
            toast({
                title: "Unactive Project " + getId.pId.name + " Failed",
                status: 'error',
                position: 'bottom-right',
                duration: 2000,
                isClosable: true
            });
        });
        onCloseUnactive();
    };
    var styleButton = {
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        padding: '5px 0px',
        borderRadius: '5px',
        border: '1px solid lightgray'
    };
    var themeColor = react_redux_1.useSelector(StoreId_2.themeSelector).themeColor;
    return (react_2["default"].createElement(react_1.Box, { p: 5, width: "100%", maxW: "1200px", m: "0 auto" },
        react_2["default"].createElement(Modal_1["default"], { isOpen: isOpenNewProject, onOpen: onOpenNewProject, onClose: onCloseNewProject, component: react_2["default"].createElement(NewProject_1["default"], { TYPE_SAVE: "ADD_PROJECT", onClose: onCloseNewProject }), title: "Create Project" }),
        react_2["default"].createElement(Modal_1["default"], { isOpen: isOpenEditProject, onOpen: onOpenEditProject, onClose: onCloseEditProject, component: react_2["default"].createElement(EditProject_1["default"], { onClose: onCloseEditProject, currentProject: currentProject }), title: "Edit Project" }),
        react_2["default"].createElement(react_1.Box, { mb: 5, display: 'flex', justifyContent: 'center' },
            react_2["default"].createElement(react_1.Button, { leftIcon: react_2["default"].createElement(react_feather_1.Plus, null), bgColor: themeColor ? themeColor : 'blue.400', color: 'white', onClick: onOpenNewProject }, "New Project")),
        react_2["default"].createElement(FilterProject_1["default"], { handleOnchangeOptionFilter: handleOnchangeOptionFilter, currentStatusFilter: currentStatusFilter, handleOnChangeInputFilter: handleOnChangeInputFilter, inputFilter: inputFilter }), (_a = transformProject_1.transformProject(projects)) === null || _a === void 0 ? void 0 :
        _a.map(function (item, index) {
            return (react_2["default"].createElement(react_1.Box, { key: index, mt: 2 },
                react_2["default"].createElement(react_1.Box, { fontSize: "20px", fontWeight: "bold", color: "white", backgroundColor: themeColor ? themeColor : 'blue.400', p: 2, borderTopLeftRadius: 5, borderTopRightRadius: 5 }, item.customerName.toUpperCase()),
                react_2["default"].createElement(react_1.Box, { backgroundColor: themeColor ? themeColor.replace('.400', '.50') : 'blue.50', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }, item.data.map(function (data, index) { return (react_2["default"].createElement(react_1.Flex, { key: data.id, alignItems: "center", py: 1, pr: 2, borderBottom: '1px solid #dddbdb' },
                    react_2["default"].createElement(react_1.Box, null,
                        react_2["default"].createElement(react_1.Text, { pl: 2, fontWeight: 'bold', color: 'gray' }, data.name)),
                    react_2["default"].createElement(react_1.Box, { display: 'flex', flexWrap: 'wrap' },
                        react_2["default"].createElement("span", { style: { background: '#2E95EA', color: 'white', borderRadius: '10px', padding: '0px 7px', fontSize: '13px', fontWeight: 'bold', margin: '1px 0px 2px 5px' } }, data.pms.join(', ')),
                        react_2["default"].createElement("span", { style: { background: 'red', color: 'white', borderRadius: '10px', padding: '0px 7px', fontSize: '13px', fontWeight: 'bold', margin: '1px 0px 2px 5px' } },
                            data.activeMember,
                            " members"),
                        react_2["default"].createElement("span", { style: { background: '#4CAF50', color: 'white', borderRadius: '10px', padding: '0px 7px', fontSize: '13px', fontWeight: 'bold', margin: '1px 0px 2px 5px' } },
                            react_2["default"].createElement("span", { style: { padding: '0px', margin: '0' } }, dayjs_1["default"](data.timeStart).format('DD/MM/YYYY')),
                            " ",
                            data.timeEnd ? react_2["default"].createElement("span", { style: { padding: '0px', margin: '0' } },
                                "- ",
                                dayjs_1["default"](data.timeEnd).format('DD/MM/YYYY')) : "")),
                    react_2["default"].createElement(react_1.Box, { ml: 'auto', display: 'flex', alignItems: 'center' },
                        react_2["default"].createElement("span", { className: 'active-status', style: { marginLeft: 'auto', color: 'white', borderRadius: '2px', padding: '0px 7px', fontSize: '13px', fontWeight: 'bold', marginRight: '5px' } }, data.status ? react_2["default"].createElement("span", { style: { background: 'grey', color: 'white', borderRadius: '2px', padding: '0px 5px', fontSize: '13px', paddingBottom: '3px' } }, "InActive")
                            : react_2["default"].createElement("span", { style: { background: '#4CAF50', color: 'white', borderRadius: '2px', padding: '0px 7px', fontSize: '13px', fontWeight: 'bold', paddingBottom: '3px' } }, "Active")),
                        react_2["default"].createElement(react_menu_1.Menu, { menuButton: react_2["default"].createElement(react_menu_1.MenuButton, { style: styleButton },
                                "Action ",
                                react_2["default"].createElement(Feather.ChevronDown, { size: 20 })), transition: true },
                            data.status ?
                                react_2["default"].createElement(react_menu_1.MenuItem, { style: { marginBottom: '10px' }, onClick: function () {
                                        dispatch(StoreId_1.addId(data));
                                        onOpenActive();
                                    } },
                                    react_2["default"].createElement(Feather.Check, { size: 20, style: { marginRight: '15px' } }),
                                    "Active")
                                :
                                    react_2["default"].createElement(react_menu_1.MenuItem, { style: { marginBottom: '10px' }, onClick: function () {
                                            dispatch(StoreId_1.addId(data));
                                            onOpenUnactive();
                                        } },
                                        react_2["default"].createElement(Feather.X, { size: 20, style: { marginRight: '15px' } }),
                                        "Unactive"),
                            react_2["default"].createElement(react_menu_1.MenuItem, { style: { marginBottom: '10px' }, onClick: function () {
                                    setCurrentProject(data.id);
                                    onOpenEditProject();
                                } },
                                react_2["default"].createElement(Feather.Edit, { size: 20, style: { marginRight: '15px' } }),
                                "Edit"),
                            react_2["default"].createElement(react_menu_1.MenuItem, { style: { marginBottom: '10px' }, onClick: function () {
                                    dispatch(StoreId_1.addId(data));
                                    onOpenDel();
                                } },
                                react_2["default"].createElement(Feather.Trash2, { size: 20, style: { marginRight: '15px' } }),
                                "Delete"))))); }))));
        }),
        react_2["default"].createElement(react_1.AlertDialog, { motionPreset: 'slideInBottom', isOpen: isOpenDel, leastDestructiveRef: cancelRef, onClose: onCloseDel },
            react_2["default"].createElement(react_1.AlertDialogOverlay, null,
                react_2["default"].createElement(react_1.AlertDialogContent, null,
                    react_2["default"].createElement(react_1.AlertDialogHeader, { fontSize: 'lg', fontWeight: 'bold', display: 'flex' },
                        "Delete Project: ",
                        react_2["default"].createElement(react_1.Text, { pl: '4', pr: '2', fontStyle: 'italic' }, getId.pId.name),
                        "?"),
                    react_2["default"].createElement(react_1.AlertDialogBody, null, "Are you sure? You can't undo this action afterwards."),
                    react_2["default"].createElement(react_1.AlertDialogFooter, null,
                        react_2["default"].createElement(react_1.Button, { ref: cancelRef, onClick: onCloseDel }, "Cancel"),
                        react_2["default"].createElement(react_1.Button, { colorScheme: 'red', onClick: handleDelete, ml: 3 }, "Delete"))))),
        react_2["default"].createElement(react_1.AlertDialog, { motionPreset: 'slideInBottom', isOpen: isOpenActive, leastDestructiveRef: cancelRef, onClose: onCloseActive },
            react_2["default"].createElement(react_1.AlertDialogOverlay, null,
                react_2["default"].createElement(react_1.AlertDialogContent, null,
                    react_2["default"].createElement(react_1.AlertDialogHeader, { fontSize: 'lg', fontWeight: 'bold', display: 'flex' },
                        "Active Project: ",
                        react_2["default"].createElement(react_1.Text, { pl: '4', pr: '2', fontStyle: 'italic' }, getId.pId.name),
                        "?"),
                    react_2["default"].createElement(react_1.AlertDialogBody, null, "Are you sure? You can't undo this action afterwards."),
                    react_2["default"].createElement(react_1.AlertDialogFooter, null,
                        react_2["default"].createElement(react_1.Button, { ref: cancelRef, onClick: onCloseActive }, "Cancel"),
                        react_2["default"].createElement(react_1.Button, { colorScheme: 'red', onClick: handleActive, ml: 3 }, "Active"))))),
        react_2["default"].createElement(react_1.AlertDialog, { motionPreset: 'slideInBottom', isOpen: isOpenUnactive, leastDestructiveRef: cancelRef, onClose: onCloseUnactive },
            react_2["default"].createElement(react_1.AlertDialogOverlay, null,
                react_2["default"].createElement(react_1.AlertDialogContent, null,
                    react_2["default"].createElement(react_1.AlertDialogHeader, { fontSize: 'lg', fontWeight: 'bold', display: 'flex' },
                        "Unctive Project: ",
                        react_2["default"].createElement(react_1.Text, { pl: '4', pr: '2', fontStyle: 'italic' }, getId.pId.name),
                        "?"),
                    react_2["default"].createElement(react_1.AlertDialogBody, null, "Are you sure? You can't undo this action afterwards."),
                    react_2["default"].createElement(react_1.AlertDialogFooter, null,
                        react_2["default"].createElement(react_1.Button, { ref: cancelRef, onClick: onCloseUnactive }, "Cancel"),
                        react_2["default"].createElement(react_1.Button, { colorScheme: 'red', onClick: handleUnActive, ml: 3 }, "Unactive")))))));
}
exports["default"] = ProjectManager;
