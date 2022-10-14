"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var React = require("react");
function Modal(_a) {
    var title = _a.title, component = _a.component, isOpen = _a.isOpen, onOpen = _a.onOpen, onClose = _a.onClose;
    return (React.createElement(react_1.Modal, { size: "xl", closeOnOverlayClick: false, onClose: onClose, isOpen: isOpen, motionPreset: 'none' },
        React.createElement(react_1.ModalOverlay, null),
        React.createElement(react_1.ModalContent, null,
            React.createElement(react_1.ModalHeader, null, title),
            React.createElement(react_1.ModalCloseButton, null),
            React.createElement(react_1.ModalBody, null, component),
            React.createElement(react_1.ModalFooter, null))));
}
exports["default"] = Modal;
