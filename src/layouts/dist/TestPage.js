"use strict";
exports.__esModule = true;
var react_1 = require("react");
var reactjs_popup_1 = require("reactjs-popup");
function TestPage() {
    return (react_1["default"].createElement(reactjs_popup_1["default"], { trigger: react_1["default"].createElement("button", { className: "button" }, " Open Modal "), modal: true, nested: true }, function (close) { return (react_1["default"].createElement("div", { className: "modal" },
        react_1["default"].createElement("button", { className: "close", onClick: close }, "\u00D7"),
        react_1["default"].createElement("div", { className: "header" }, " Modal Title "),
        react_1["default"].createElement("div", { className: "content" },
            ' ',
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?",
            react_1["default"].createElement("br", null),
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?"),
        react_1["default"].createElement("div", { className: "actions" },
            react_1["default"].createElement(reactjs_popup_1["default"], { trigger: react_1["default"].createElement("button", { className: "button" }, " Trigger "), position: "top center", nested: true },
                react_1["default"].createElement("span", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.")),
            react_1["default"].createElement("button", { className: "button", onClick: function () {
                    console.log('modal closed ');
                    close();
                } }, "close modal")))); }));
}
exports["default"] = TestPage;
;
