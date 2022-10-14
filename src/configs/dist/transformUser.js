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
exports.getObjectById = exports.mergeObjectUserForm = exports.mergeObjectById = exports.deleteArrRemoveUserForm = exports.deleteArrInArrById = void 0;
exports.deleteArrInArrById = function (arrayNeedDelete, array) {
    if (!arrayNeedDelete || !array)
        return null;
    return arrayNeedDelete.filter(function (itemOfArrayNeedDelete) {
        var result = true;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var itemOfArray = array_1[_i];
            if (itemOfArray.id === itemOfArrayNeedDelete.id)
                result = false;
        }
        return result;
    });
};
exports.deleteArrRemoveUserForm = function (userForm) { return function (userId) {
    return userForm.filter(function (item) { return item.userId !== userId; });
}; };
exports.mergeObjectById = function (array1) {
    return function (array2) {
        if (!array1 || !array2)
            return null;
        return array1.map(function (itemArr1) {
            var result;
            for (var _i = 0, array2_1 = array2; _i < array2_1.length; _i++) {
                var item = array2_1[_i];
                if (itemArr1.id === (item === null || item === void 0 ? void 0 : item.userId)) {
                    result = __assign(__assign({}, itemArr1), { typeOffice: item.type });
                }
            }
            return result;
        });
    };
};
exports.mergeObjectUserForm = function (userFrom1) {
    return function (userForm2) {
        if (!userFrom1 || !userForm2)
            return null;
        return userFrom1.map(function (itemArr1) {
            if (itemArr1.userId === userForm2.userId) {
                return userForm2;
            }
            else {
                return itemArr1;
            }
        });
    };
};
exports.getObjectById = function (listId) { return function (array) {
    console.log(array);
    if (!listId || !array)
        return null;
    var arrayClone = __spreadArrays(array);
    return listId.map(function (item) {
        var result;
        for (var _i = 0, arrayClone_1 = arrayClone; _i < arrayClone_1.length; _i++) {
            var itemInArray = arrayClone_1[_i];
            if (itemInArray.id === item.userId) {
                result = itemInArray;
            }
        }
        return result;
    });
}; };
