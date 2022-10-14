"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var App_1 = require("./App");
test('renders learn react link', function () {
    react_2.render(react_1["default"].createElement(App_1["default"], null));
    var linkElement = react_2.screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
    describe('divide function', function () {
        describe('when given to integers', function () {
            it('should return a division result', function () {
                var _a = [10, 2, 5], a = _a[0], b = _a[1], expected = _a[2];
                var result = a / b;
                expect(result).toEqual(expected);
            });
        });
    });
});
